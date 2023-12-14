var  config = require('../database/config')
const dbtoken = require('./token.js')
const util = require('util')

const query = util.promisify(config.query).bind(config)

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')

async function getSubjects(token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    const sql = `SELECT * FROM subjects`
    const subjects = await query(sql)

    util.promisify(config.end)
    return subjects
  } catch (err) {
    errorHandling(err, "getSubjects")
  }
}

async function getSubject(userid, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)
    
    const sql = `SELECT * FROM subjects WHERE id = ?`
    const userID = [userid]
    const subject = await query(sql, userID)
    
    if(subject.length > 1)
      throw new error.InternalServerError("Found more than one subject with this id")
    else if(subject.length == 0)
      throw new error.NotFoundError("Id didn't match any subjects")
    
    util.promisify(config.end)
    return subject[0]
  } catch (err) {
    errorHandling(err, "getSubject")
  }
}


async function getUserSubjects(userid, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    const sql = `SELECT subject_id FROM user_subject WHERE user_id = ?`
    const userID = userid
    const subjectIDs = await query(sql, userID)

    var userSubjects = []
    if (subjectIDs.length !== 0) {
      const values = subjectIDs.map(subject => subject.subject_id)
      const sql = `SELECT * FROM subjects WHERE ${subjectIDs.map(() => 'id = ?').join(' OR ')}`
      userSubjects = await query(sql, values)
    }
    
    util.promisify(config.end)
    return userSubjects  
  } catch (err) {
    errorHandling(err, "getUserSubjects")
  }
}

async function postUserSubject(userSubject, token) {
  try {
    await dbtoken.checkToken(token)
    util.promisify(config.connect)

    const sql = 'INSERT INTO user_subject (user_id, subject_id) VALUES (?, ?)';
    const userSubjectValues = [userSubject.userID, userSubject.subjectID];
    await query(sql, userSubjectValues)
    
    util.promisify(config.end)
    return true
  } catch (err) {
    errorHandling(err, "postSubmission")
  }
}

async function deleteUserSubject(userSubject, token) {
  try {
    await dbtoken.checkToken(token);
    util.promisify(config.connect);

    const sql = 'DELETE FROM user_subject WHERE user_id = ? AND subject_id = ?';
    const userSubjectValues = [userSubject.userID, userSubject.subjectID];
    await query(sql, userSubjectValues);

    util.promisify(config.end);
    return true;
  } catch (err) {
    errorHandling(err, "deleteUserSubject");
  }
}


module.exports = {
  getSubjects: getSubjects,
  getSubject: getSubject,
  getUserSubjects: getUserSubjects,
  postUserSubject: postUserSubject,
  deleteUserSubject: deleteUserSubject
}
