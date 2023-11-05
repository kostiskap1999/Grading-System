var  config = require('../database/config');
const util = require('util');

const query = util.promisify(config.query).bind(config);

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
  getUserProjects: getUserProjects
}
