var  config = require('../database/config')
const dbtoken = require('./token.js')
const util = require('util')

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')


const query = util.promisify(config.query).bind(config)

async function login(loggingUser) {
  try {
    util.promisify(config.connect)

    var sql = `SELECT id FROM credentials WHERE username = ? AND password = ?`
    const credentials = [loggingUser.username, loggingUser.password]
    const loggedID = await query(sql, credentials)

    if(loggedID.length > 1)
      throw new error.InternalServerError("Credentials found on more than one users")
    else if(loggedID.length == 0)
      throw new error.NotFoundError("Wrong credentials")

    sql = `SELECT * FROM users WHERE id = ?`
    const userID = [loggedID[0].id]
    const user = await query(sql, userID)

    if(user.length > 1)
      throw new error.InternalServerError("Found more than one user with this id")
    else if(user.length == 0)
      throw new error.NotFoundError("Id didn't match any users")
 
    const token = await dbtoken.createToken({user_id: user[0].id, role: user[0].role})
    user[0].username = loggingUser.username
    
    util.promisify(config.end) 
    return {user: user[0], token: token}
    
  } catch (err) {    
    errorHandling(err, "login")
  }
}

module.exports = {
  login: login
}
