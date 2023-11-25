var  config = require('../database/config');
const dbtoken = require('./token.js')
const util = require('util');

const query = util.promisify(config.query).bind(config);

const error = require('../errors/errorTypes');
const { errorHandling } = require('../errors/errorHandling');

async function getSubjects(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = "SELECT * FROM subjects;";
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    errorHandling(err, "getSubjects")
  }
}

async function getSubject(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM subjects WHERE id='${request.params.userid}';`;
    
    const result = await query(sqlSelect);
    
    if(result.length > 1)
      throw new error.InternalServerError("Found more than one subject with this id")
    else if(result.length == 0)
      throw new error.NotFoundError("Id didn't match any subjects")
    
    util.promisify(config.end);
    return result[0]
    
  } catch (err) {
    errorHandling(err, "getSubject")
  }
}


async function getUserSubjects(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
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
    errorHandling(err, "getUserSubjects")
  }
}

module.exports = {
  getSubjects: getSubjects,
  getSubject: getSubject,
  getUserSubjects: getUserSubjects
}
