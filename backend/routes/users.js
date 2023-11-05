var  config = require('../database/config');
const util = require('util');

const query = util.promisify(config.query).bind(config);

const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/NotFoundError');


async function getUsers(request) {
  try {
    util.promisify(config.connect);
    const sqlSelect = "SELECT * FROM users;";
    
    const result = await query(sqlSelect);
    util.promisify(config.end);
    return result
    
  } catch (err) {
    throw err;
  }
}

async function getUser(request) {
  try {
    util.promisify(config.connect);
    const sqlSelect = `SELECT * FROM users WHERE id='${request.params.userid}';`;
    
    const result = await query(sqlSelect);
    
    if(result.length > 1)
      throw new InternalServerError("Found more than one user with this id")
    else if(result.length == 0)
      throw new NotFoundError("Id didn't match any users")
    
    util.promisify(config.end);
    return result[0]
    
  } catch (err) {
    throw err;
  }
}


module.exports = {
  getUsers: getUsers,
  getUser: getUser
}
