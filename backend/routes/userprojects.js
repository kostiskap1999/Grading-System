var  config = require('../database/config');
const util = require('util');

const query = util.promisify(config.query).bind(config);

async function getUserProjects(request) {
  try {
    util.promisify(config.connect);
    const sqlSelect = "SELECT * FROM user_project;";
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUserProjects: getUserProjects
}
