var  config = require('../database/config');
const dbtoken = require('./token.js')
const util = require('util');

const query = util.promisify(config.query).bind(config);

async function getProjectSubmissions(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM submissions WHERE project_id='${request.params.projectid}';`;
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

async function postSubmission(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    var sqlSelect = `INSERT INTO submissions (code, date, comment, submitee_id, project_id) VALUES ('${request.body.code}','${request.body.date}','${request.body.comment}',${request.body.submitee_id},${request.body.project_id});`;
    
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
  getProjectSubmissions: getProjectSubmissions,
  postSubmission: postSubmission
}
