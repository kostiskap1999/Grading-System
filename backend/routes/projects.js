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

async function getUserProjects(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `SELECT project_id FROM user_project WHERE user_id='${request.params.userid}';`;
    const projectIDs = await query(sqlSelect);
    
    sqlSelect = `SELECT * FROM projects WHERE`
    for(let i=0; i<projectIDs.length; i++){
      sqlSelect += ` id=${projectIDs[i]}`
      
      if(i < projectIDs.length-1)
        sqlSelect += ` OR`
    }
    sqlSelect += `;`
    const result = await query(sqlSelect);

    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getProjects: getProjects,
  getProject: getProject,
  getUserProjects: getUserProjects
}
