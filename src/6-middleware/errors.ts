import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../3-models/client-errors";

class ErrorsMiddleware {

    // Route-not-found middleware:
    public routeNotFound(request: Request, response: Response, next: NextFunction) {
        const err = new RouteNotFoundError(request.originalUrl, request.method);
        next(err);
    }

    // Catch-all middleware:
    public catchAll(err: any, request: Request, response: Response, next: NextFunction) {
        const message = err.message;
        const status = err.status;
        response.status(status).json(message);
    }
}

export const errorsMiddleware = new ErrorsMiddleware();
