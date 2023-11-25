var  config = require('../database/config');
const dbtoken = require('./token.js')
const util = require('util');

const query = util.promisify(config.query).bind(config);

const error = require('../errors/errorTypes');
const { errorHandling } = require('../errors/errorHandling');


async function getUsers(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = "SELECT * FROM users;";
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    errorHandling(err, "getUsers")
  }
}

async function getUser(request) {
  try {
    await dbtoken.checkToken(request.headers.token)
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM users WHERE id='${request.params.userid}';`;
    
    const result = await query(sqlSelect);
    
    if(result.length > 1)
      throw new error.InternalServerError("Found more than one user with this id")
    else if(result.length == 0)
      throw new error.NotFoundError("Id didn't match any users")
    
    util.promisify(config.end);
    return result[0]
    
  } catch (err) {
    errorHandling(err, "getUser")
  }
}


module.exports = {
  getUsers: getUsers,
  getUser: getUser
}
