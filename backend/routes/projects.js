var  config = require('../database/config')
const dbtoken = require('./token.js')
const dbtests = require('./tests.js')
const util = require('util')

const query = util.promisify(config.query).bind(config)

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')

async function getProjects(token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)
    
    const sql = `SELECT * FROM projects`
    const projects = await query(sql)

    util.promisify(config.end)
    return projects
  } catch (err) {
    errorHandling(err, "getProjects")
  }
}

async function getProject(id, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    const sql = `SELECT * FROM projects WHERE id = ?`
    const projectID = [id]
    const project = await query(sql, projectID)
    
    if(project.length > 1)
      throw new error.InternalServerError("Found more than one project with this id")
    else if(project.length == 0)
      throw new error.NotFoundError("Id didn't match any projects")
    
    util.promisify(config.end)
    return project[0]
  } catch (err) {
    errorHandling(err, "getProject")
  }
}

async function getUserProjects(userid, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)
    
    var sql = `SELECT subject_id FROM user_subject WHERE user_id = ?`
    const userID = [userid]
    const subjectIDs = await query(sql, userID)

    var userProjects = [] // initialise in case it is empty    
    if (subjectIDs.length != 0){
      sql = `SELECT * FROM projects WHERE`
      sql += subjectIDs.map(() => ' id=?').join(' OR')
      userProjects = await query(sql, subjectIDs.map(subject => subject.subject_id))
    }
    
    util.promisify(config.end)
    return userProjects
  } catch (err) {
    errorHandling(err, "getUserProjects")
  }
}

async function getSubjectProjects(subjectid, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    const sql = `SELECT * FROM projects WHERE subject_id = ?`
    const subjectID = subjectid
    const subjectProjects = await query(sql, subjectID)
    
    util.promisify(config.end)
    return subjectProjects
  } catch (err) {
    errorHandling(err, "getSubjectProjects")
  }
}

async function postProjects(project, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    var sql = 'INSERT INTO projects (name, description, deadline, subject_id) VALUES (?, ?, ?, ?)'
    const projectValues = [project.name, project.description, project.deadline, project.subjectID]
    await query(sql, projectValues)
    
    sql = `SELECT id FROM projects WHERE id >= LAST_INSERT_ID()`
    const insertedID = await query(sql)

    await dbtests.postTestsFromPostProjects(project.tests, insertedID[0].id, token)
    
    util.promisify(config.end)
    return true
  } catch (err) {
    errorHandling(err, "postProjects")
  }
}



module.exports = {
  getProjects: getProjects,
  getProject: getProject,
  getUserProjects: getUserProjects,
  getSubjectProjects: getSubjectProjects,
  postProjects: postProjects
}
