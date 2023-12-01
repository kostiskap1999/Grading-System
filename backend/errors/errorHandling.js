const errors = require("./errorTypes");

const errorHandling = (error, functionName) => {
    console.log("=====================\n");
    console.error("In function: " + functionName + "\nStatus code: " + error.statusCode + "\nMessage: " + error.message + "\n")
    console.log(error)
    console.log("\n=====================");

    if (error.statusCode === 401)
        throw new errors.UnauthorizedError(error.message);
    else if (error.statusCode === 403)
        throw new errors.ForbiddenError(error.message);
    else if (error.statusCode === 404)
        throw new errors.NotFoundError(error.message);
    else
        throw new errors.InternalServerError(error.message);

}

module.exports = { errorHandling }
