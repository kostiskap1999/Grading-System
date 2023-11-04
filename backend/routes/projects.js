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

module.exports = {
  getProjects: getProjects
}
