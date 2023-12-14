const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { errorHandling } = require('../errors/errorHandling');

async function createToken(payload) {
  try {
    TOKEN_KEY = process.env.TOKEN_KEY;
    const token = jwt.sign(payload, TOKEN_KEY, {expiresIn: "168h"})

    return token
  } catch (err) {
    errorHandling(err, "createToken")
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
    errorHandling(err, "checkToken")
  }
}

async function getUserIDFromToken(token) {
  try {
    const decoded = await checkToken(token)

    return decoded.user_id
  } catch (err) {
    errorHandling(err, "getUserIDFromToken")
  }
}

async function getRoleFromToken(token) {
  try {
    const decoded = await checkToken(token)
    
    return decoded.role
  } catch (err) {
    errorHandling(err, "getRoleFromToken")
  }
}

module.exports = {
  createToken: createToken,
  checkToken: checkToken,
  getUserIDFromToken: getUserIDFromToken,
  getRoleFromToken: getRoleFromToken
}
