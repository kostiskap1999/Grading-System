const errors = require("./errorTypes");

const errorHandling = (error, functionName) => {
    console.log("=====================\n");
    console.error("In function: " + functionName + "\nStatus code: " + error.statusCode + "\nMessage: " + error.message + "\n")
    console.log(error)
    console.log("\n=====================");

    if (error.message === "401")
        throw new errors.UnauthorizedError();
    else if (error.message === "403")
        throw new errors.ForbiddenError();
    else if (error.message === "404")
        throw new errors.NotFoundError();
    else if (error.message === "500") {
        throw new errors.InternalServerError();
    } else {
        throw new errors.InternalServerError(error.message);
    }
}

module.exports = { errorHandling }
