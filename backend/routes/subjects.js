var  config = require('../database/config');
const util = require('util');

const query = util.promisify(config.query).bind(config);

const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/NotFoundError');

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

async function getSubject(request) {
  try {
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM subjects WHERE id='${request.params.userid}';`;
    
    const result = await query(sqlSelect);
    
    if(result.length > 1)
      throw new InternalServerError("Found more than one subject with this id")
    else if(result.length == 0)
      throw new NotFoundError("Id didn't match any subjects")
    
    util.promisify(config.end);
    return result[0]
    
  } catch (err) {
    throw err;
  }
}


async function getUserSubjects(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `SELECT subject_id FROM user_subject WHERE user_id='${request.params.userid}';`;
    const subjectIDs = await query(sqlSelect);
    
    var result = []
    if (subjectIDs.length != 0){
      sqlSelect = `SELECT * FROM subjects WHERE`
      for(let i=0; i<subjectIDs.length; i++){
        sqlSelect += ` id=${subjectIDs[i].subject_id}`
        
        if(i < subjectIDs.length-1)
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

module.exports = {
  getSubjects: getSubjects,
  getSubject: getSubject,
  getUserSubjects: getUserSubjects
}
