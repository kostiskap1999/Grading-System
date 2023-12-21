import { HttpError, InternalServerError } from "./errorTypes";
import { Response, Request } from "express";

export const errorHandling = (error: Error, res: Response) => {
    let httpError = error instanceof HttpError? error : new InternalServerError(error.message)

    res.status(httpError.statusCode).send(httpError.message)
}
