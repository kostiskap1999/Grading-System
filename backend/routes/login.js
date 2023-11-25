var  config = require('../database/config');
const dbtoken = require('./token.js')
const util = require('util');

const error = require('../errors/errorTypes');
const { errorHandling } = require('../errors/errorHandling');


const query = util.promisify(config.query).bind(config);

async function login(request) {
  try {
    util.promisify(config.connect);
    var sqlSelect = `SELECT id FROM credentials WHERE username='${request.body.username}' AND password='${request.body.password}';`;
    const loggedID = await query(sqlSelect);

    if(loggedID.length > 1)
      throw new error.InternalServerError("Credentials found on more than one users")
    else if(loggedID.length == 0)
      throw new error.NotFoundError("Wrong credentials")

    sqlSelect = `SELECT * FROM users WHERE id='${loggedID[0].id}';`;
    const result = await query(sqlSelect);

    if(result.length > 1)
      throw new error.InternalServerError("Found more than one user with this id")
    else if(result.length == 0)
      throw new error.NotFoundError("Id didn't match any users")
 
    const token = await dbtoken.createToken({user_id: result[0].id, role: result[0].role})
    
    result[0].username = request.body.username
    util.promisify(config.end); 
    return {user: result[0], token: token}
    
  } catch (err) {    
    errorHandling(err, "login")
  }
}

module.exports = {
  login: login
}
