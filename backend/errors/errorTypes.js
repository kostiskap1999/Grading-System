class UnauthorizedError extends Error {
    constructor (message = "Unauthorized") {
        super(message);
        this.statusCode = 401;
    }
}

class ForbiddenError extends Error {
    constructor (message = "Forbidden") {
        super(message);
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor (message = "Not found") {
        super(message);
        this.statusCode = 404;
    }
}


class InternalServerError extends Error {
    constructor (message = "Internal server error") {
        super(message);
        this.statusCode = 500;
    }
}

module.exports = {
    UnauthorizedError: UnauthorizedError,
    ForbiddenError: ForbiddenError,
    NotFoundError: NotFoundError,
    InternalServerError: InternalServerError
}