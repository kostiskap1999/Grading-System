var  config = require('../database/config')
const dbtoken = require('./token.js')
const util = require('util')

const query = util.promisify(config.query).bind(config)

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')

async function getSubjects(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)

    const sql = `SELECT * FROM subjects`    
    const subjects = await query(sql)

    util.promisify(config.end)
    return subjects
  } catch (err) {
    errorHandling(err, "getSubjects")
  }
}

async function getSubject(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)
    
    const sql = `SELECT * FROM subjects WHERE id = ?`
    const userID = [request.params.userid]
    const subject = await query(sql, userID)
    
    if(subject.length > 1)
      throw new error.InternalServerError("Found more than one subject with this id")
    else if(subject.length == 0)
      throw new error.NotFoundError("Id didn't match any subjects")
    
    util.promisify(config.end)
    return subject[0]
  } catch (err) {
    errorHandling(err, "getSubject")
  }
}


async function getUserSubjects(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)

    const sql = `SELECT subject_id FROM user_subject WHERE user_id = ?`
    const userID = request.params.userid
    const subjectIDs = await query(sql, userID)

    var userSubjects = []
    if (subjectIDs.length !== 0) {
      const values = subjectIDs.map(subject => subject.subject_id)
      const sql = `SELECT * FROM subjects WHERE ${subjectIDs.map(() => 'id = ?').join(' OR ')}`
      userSubjects = await query(sql, values)
    }
    
    util.promisify(config.end)
    return userSubjects  
  } catch (err) {
    errorHandling(err, "getUserSubjects")
  }
}

module.exports = {
  getSubjects: getSubjects,
  getSubject: getSubject,
  getUserSubjects: getUserSubjects
}
