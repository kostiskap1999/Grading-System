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

    var date = new Date()

    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')
    
    var formattedDate = year + '-' + month + '-' + day

    const sql = 'INSERT INTO submissions (code, date, comment, submitee_id, project_id) VALUES (?, ?, ?, ?, ?)';
    const submissionValues = [request.body.code, formattedDate, request.body.comment, request.body.submitee_id, request.body.project_id];
    await query(sql, submissionValues)
    
    util.promisify(config.end)
    return true
  } catch (err) {
    errorHandling(err, "postSubmission")
  }
}

async function patchSubmission(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)

    var date = new Date(request.body.date)

    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')
    
    var formattedDate = year + '-' + month + '-' + day

    const sql = 'UPDATE submissions SET code = ?, date = ?, grade = ?, comment = ? WHERE id = ?;';
    const submissionValues = [request.body.code, formattedDate, request.body.grade, request.body.comment, request.body.id];
    
    await query(sql, submissionValues)
    
    util.promisify(config.end)
    return true
  } catch (err) {
    errorHandling(err, "patchSubmission")
  }
}

module.exports = {
  getProjectSubmissions: getProjectSubmissions,
  postSubmission: postSubmission,
  patchSubmission: patchSubmission
}
