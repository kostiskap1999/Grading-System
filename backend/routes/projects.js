var  config = require('../database/config');
const dbtoken = require('./token.js')
const util = require('util');

const query = util.promisify(config.query).bind(config);

const error = require('../errors/errorTypes');
const { errorHandling } = require('../errors/errorHandling');

async function getProjects(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = "SELECT * FROM projects;";
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    errorHandling(err, "getProjects")
  }
}

async function getProject(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM projects WHERE id=${request.params.id};`;
    
    const result = await query(sqlSelect);
    
    if(result.length > 1)
      throw new error.InternalServerError("Found more than one project with this id")
    else if(result.length == 0)
      throw new error.NotFoundError("Id didn't match any projects")
    
    util.promisify(config.end);
    return result[0]
    
  } catch (err) {
    errorHandling(err, "getProject")
  }
}

async function getUserProjects(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    
    var sqlSelect = `SELECT subject_id FROM user_subject WHERE user_id=${request.params.userid};`;
    const projectIDs = await query(sqlSelect);

    var result = []
    if (projectIDs.length != 0){
      sqlSelect = `SELECT * FROM projects WHERE`
      for(let i=0; i<projectIDs.length; i++){
        sqlSelect += ` id=${projectIDs[i].subject_id}`
        
        if(i < projectIDs.length-1)
          sqlSelect += ` OR`
      }
      sqlSelect += `;`
      result = await query(sqlSelect);
    }
    
    util.promisify(config.end);
    return result
    
  } catch (err) {
    errorHandling(err, "getUserProjects")
  }
}

async function getSubjectProjects(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM projects WHERE subject_id=${request.params.subjectid};`;
    const result = await query(sqlSelect);
    
    util.promisify(config.end);
    return result
    
  } catch (err) {
    errorHandling(err, "getSubjectProjects")
  }
}

async function postProjects(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `INSERT INTO projects (name, description, deadline, subject_id) VALUES ('${request.body.name}','${request.body.description}','${request.body.deadline}',${request.body.subjectID});`;
    
    const result = await query(sqlSelect);
    
    if(result.affectedRows != 1)
      throw new error.InternalServerError("There has been an error")
    
    util.promisify(config.end);
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
