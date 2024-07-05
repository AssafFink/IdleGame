import { Document, Error, ObjectId } from "mongoose";
import { StatusCode } from "./enums";

// Base client error:
abstract class ClientError {
    public constructor(public status: number, public message: string) { }
}

// Base not found: 
abstract class NotFoundError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.NotFound, message);
    }
}

// Unauthorized: 
export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}

// Forbidden: 
export class ForbiddenError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.Forbidden, message);
    }
}

// Route not found: 
export class RouteNotFoundError extends NotFoundError {
    public constructor(route: string, method: string) {
        super(`Route ${route} on method ${method} not found.`);
    }
}

// Resource not found: 
export class ResourceNotFoundError extends NotFoundError {
    public constructor(_id: string | ObjectId) {
        super(`_id ${_id} not found.`);
    }
}

// Email not found: 
export class EmailNotFoundError extends NotFoundError {
    public constructor(email: string) {
        super(`Email ${email} not found.`);
    }
}

// Model validation: 
export class ValidationError extends ClientError {

    public constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}

// Mongoose models validation:
export class ModelValidation {

    // Validate mongoose model - only sync validations:
    public static validateSync(document: Document): void {

        // Validate only sync validations: 
        const err = document.validateSync();

        // If there are errors:
        if (err) {

            // Extract mongoose validation message:
            const message = ModelValidation.formatMongooseErrorMessage(err.message);

            // Throw our own 400 validation object:
            throw new ValidationError(message);
        }
    }

    // Validate mongoose model - both sync and async validations:
    public static async validate(document: Document): Promise<void> {

        // If mongoose validation failed - it throws an Error.ValidationError object, but we want to throw our own 400 validation object:
        try {

            // Validate sync and async validations:
            await document.validate();
        }
        catch (err: any) {

            // If crash due to validation - throw our own 400 validation object:
            if (err instanceof Error.ValidationError) {

                // Extract mongoose validation message:
                const message = ModelValidation.formatMongooseErrorMessage(err.message);

                // Throw our own 400 validation object:
                throw new ValidationError(message);
            }

            // If crash due to some other reason - throw original error:
            throw err;
        }
    }

    // "CredentialsModel validation failed: email: Missing email address." --> "Missing email address."
    private static formatMongooseErrorMessage(message: string): string {
        const lastColonIndex = message.lastIndexOf(":");
        if (lastColonIndex === -1) return message;
        return message.substring(lastColonIndex + 2);
    }
}
