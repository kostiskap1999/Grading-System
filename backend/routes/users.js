var  config = require('../database/config')
const dbtoken = require('./token.js')
const util = require('util')

const query = util.promisify(config.query).bind(config)

const error = require('../errors/errorTypes')
const { errorHandling } = require('../errors/errorHandling')


async function getUsers(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)

    const sql = `SELECT * FROM users`
    const users = await query(sql)

    util.promisify(config.end)
    return users
  } catch (err) {
    errorHandling(err, "getUsers")
  }
}

async function getUser(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect)
    
    const sql = `SELECT * FROM users WHERE id='${request.params.userid}'`
    const user = await query(sql)
    
    if(user.length > 1)
      throw new error.InternalServerError("Found more than one user with this id")
    else if(user.length == 0)
      throw new error.NotFoundError("Id didn't match any users")
    
    util.promisify(config.end)
    return user[0]
  } catch (err) {
    errorHandling(err, "getUser")
  }
}


module.exports = {
  getUsers: getUsers,
  getUser: getUser
}
