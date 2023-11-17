const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function createToken(payload) {
  try {
    TOKEN_KEY = process.env.TOKEN_KEY;
    const token = jwt.sign(payload, TOKEN_KEY, {expiresIn: "168h"})
    return token
  } catch (err) {
    throw err;
  }
}

async function checkToken(token) {
  try {
    TOKEN_KEY = process.env.TOKEN_KEY;
    const decoded = jwt.verify(token, TOKEN_KEY);

    const timeLeft = (decoded.exp - Math.floor(Date.now()/1000));
    if (timeLeft <= 0){
        console.log('Token expired');
        return response.status(401);
    }
    return decoded
  } catch (err) {
    throw err;
  }
}

async function getUserIDFromToken(request) {
  try {
    const decoded = checkToken(request.headers.token)
    return decoded.user_id
  } catch (err) {
    throw err;
  }
}

async function getRoleFromToken(request) {
  try {
    const decoded = checkToken(request.headers.token)
    return decoded.role
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createToken: createToken,
  checkToken: checkToken,
  getUserIDFromToken: getUserIDFromToken,
  getRoleFromToken: getRoleFromToken
}
