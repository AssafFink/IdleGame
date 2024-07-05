import express, { NextFunction, Request, Response } from "express";
import { UserModel } from "../3-models/user";
import { authService } from "../4-services/auth";
import { StatusCode } from "../3-models/enums";

class AuthController {
    public readonly router = express.Router();
    public constructor() {
        this.router.post("/auth/register", this.register);
    }
    private async register(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const user = new UserModel(request.body);
            const dbUser = await authService.register(user);
            response.status(StatusCode.Created).json(dbUser);
        }
        catch (err: any) { next(err); }
    }
}

export const authController = new AuthController();
