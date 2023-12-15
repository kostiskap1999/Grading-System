export class HttpError extends Error {
    protected constructor (
        public message: string,
        public statusCode: number
    ) {
        console.log(`
=====================
Error ${statusCode}: ${message}
=====================
        `);
        console.trace();
        super(message)
    }
}

export class UnauthorizedError extends HttpError {
    constructor (message = "Unauthorized") {
        super(message, 401);
    }
}

export class ForbiddenError extends HttpError {
    constructor (message = "Forbidden") {
        super(message, 403);
    }
}

export class NotFoundError extends HttpError {
    constructor (message = "Not found") {
        super(message, 404);
    }
}


export class InternalServerError extends HttpError {
    constructor (message = "Internal server error") {
        super(message, 500);
    }
}
