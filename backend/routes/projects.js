var  config = require('../database/config');
const util = require('util');

const query = util.promisify(config.query).bind(config);

const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/NotFoundError');

async function getProjects(request) {
  try {
    util.promisify(config.connect);
    const sqlSelect = "SELECT * FROM projects;";
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

async function getProject(request) {
  try {
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM projects WHERE id='${request.params.userid}';`;
    
    const result = await query(sqlSelect);
    
    if(result.length > 1)
      throw new InternalServerError("Found more than one subject with this id")
    else if(result.length == 0)
      throw new NotFoundError("Id didn't match any projects")
    
    util.promisify(config.end);
    return result[0]
    
  } catch (err) {
    throw err;
  }
}

async function getSubjectProjects(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `SELECT project_id FROM subject_project WHERE subject_id='${request.params.subjectid}';`;
    const projectIDs = await query(sqlSelect);

    var result = []
    if (projectIDs.length != 0){
      sqlSelect = `SELECT * FROM projects WHERE`
      for(let i=0; i<projectIDs.length; i++){
        sqlSelect += ` id=${projectIDs[i].project_id}`
        
        if(i < projectIDs.length-1)
          sqlSelect += ` OR`
      }
      sqlSelect += `;`
      result = await query(sqlSelect);
    }
    
    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

async function getUserProjects(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `SELECT project_id FROM user_project WHERE user_id='${request.params.userid}';`;
    const projectIDs = await query(sqlSelect);
    
    var result = []
    if (projectIDs.length != 0){
      sqlSelect = `SELECT * FROM projects WHERE`
      for(let i=0; i<projectIDs.length; i++){
        sqlSelect += ` id=${projectIDs[i].project_id}`
        
        if(i < projectIDs.length-1)
          sqlSelect += ` OR`
      }
      sqlSelect += `;`
      result = await query(sqlSelect);
    }
    
    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

async function postProjects(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `INSERT INTO projects (name, description, deadline, subject_id) VALUES ('${request.body.name}','${request.body.description}','${request.body.deadline}',${request.body.subjectID});`;
    
    const result = await query(sqlSelect);
    
    if(result.affectedRows != 1)
      throw new InternalServerError("There has been an error")
    
    util.promisify(config.end);
    return true
    
  } catch (err) {
    throw err;
  }
}



module.exports = {
  getProjects: getProjects,
  getProject: getProject,
  getUserProjects: getUserProjects,
  getSubjectProjects: getSubjectProjects,
  postProjects: postProjects
}
