var  config = require('../database/config')
const dbtoken = require('./token.js')
const util = require('util')

const query = util.promisify(config.query).bind(config)

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')

async function getProjectSubmissions(projectid, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)
    
    const sql = `SELECT * FROM submissions WHERE project_id = ?`
    const projectID = projectid
    const projectSubmissions = await query(sql, projectID)
    
    util.promisify(config.end)
    return projectSubmissions
  } catch (err) {
    errorHandling(err, "getProjectSubmissions")
  }
}

async function getProjectUserSubmission(projectUserSubmission, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)
    
    const sql = `SELECT * FROM submissions WHERE project_id = ? AND submitee_id = ?`
    const values = [projectUserSubmission.projectid, projectUserSubmission.userid]
    const projectUserSubmissions = await query(sql, values)
    
    util.promisify(config.end)
    return projectUserSubmissions
  } catch (err) {
    errorHandling(err, "getProjectUserSubmission")
  }
}

async function postSubmission(submission, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    var date = new Date()

    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')
    
    var formattedDate = year + '-' + month + '-' + day

    const sql = 'INSERT INTO submissions (code, date, comment, submitee_id, project_id) VALUES (?, ?, ?, ?, ?)';
    const submissionValues = [submission.code, formattedDate, submission.comment, submission.submitee_id, submission.project_id];
    await query(sql, submissionValues)
    
    util.promisify(config.end)
    return true
  } catch (err) {
    errorHandling(err, "postSubmission")
  }
}

async function patchSubmission(submission, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    var date = new Date(submission.date)

    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')
    
    var formattedDate = year + '-' + month + '-' + day

    const sql = 'UPDATE submissions SET code = ?, date = ?, grade = ?, comment = ? WHERE id = ?;';
    const submissionValues = [submission.code, formattedDate, submission.grade, submission.comment, submission.id];
    
    await query(sql, submissionValues)
    
    util.promisify(config.end)
    return true
  } catch (err) {
    errorHandling(err, "patchSubmission")
  }
}

module.exports = {
  getProjectSubmissions: getProjectSubmissions,
  getProjectUserSubmission: getProjectUserSubmission,
  postSubmission: postSubmission,
  patchSubmission: patchSubmission
}
