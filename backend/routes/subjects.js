var  config = require('../database/config');
const util = require('util');

const query = util.promisify(config.query).bind(config);

async function getSubjects(request) {
  try {
    util.promisify(config.connect);
    const sqlSelect = "SELECT * FROM subjects;";
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

async function getUserSubjects(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `SELECT subject_id FROM user_subject WHERE user_id='${request.params.userid}';`;
    const subjectIDs = await query(sqlSelect);
    
    sqlSelect = `SELECT * FROM subjects WHERE`
    for(let i=0; i<subjectIDs.length; i++){
      sqlSelect += ` id=${subjectIDs[i]}`
      
      if(i < subjectIDs.length-1)
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
  getSubjects: getSubjects,
  getUserSubjects: getUserSubjects
}
