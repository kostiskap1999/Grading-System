var  config = require('../database/config')
const dbtoken = require('./token.js')
const util = require('util')

const query = util.promisify(config.query).bind(config)

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')

async function getProjectSubmissions(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)
    
    const sql = `SELECT * FROM submissions WHERE project_id = ?`
    const projectID = request.params.projectid
    const projectSubmissions = await query(sql, projectID)
    
    util.promisify(config.end)
    return projectSubmissions
  } catch (err) {
    errorHandling(err, "getProjectSubmissions")
  }
}

async function postSubmission(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)

    const sql = 'INSERT INTO submissions (code, date, comment, submitee_id, project_id) VALUES (?, ?, ?, ?, ?)';
    const submissionValues = [request.body.code, request.body.date, request.body.comment, request.body.submitee_id, request.body.project_id];
    await query(sql, submissionValues)
    
    util.promisify(config.end)
    return true
  } catch (err) {
    errorHandling(err, "postSubmission")
  }
}

module.exports = {
  getProjectSubmissions: getProjectSubmissions,
  postSubmission: postSubmission
}
