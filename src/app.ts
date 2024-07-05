import cors from "cors";
import express, { Express } from "express";
import expressRateLimit from "express-rate-limit";
import { errorsMiddleware } from "./6-middleware/errors";
import { authController } from "./5-controllers/auth";
import { appConfig } from "./2-utils/app-config";

class App {

    private server: Express;

    public async start(): Promise<void> {
        try {
            this.server = express();
            this.registerMiddleware();
            this.server.listen(appConfig.port, () => console.log(`Server is running in ${process.env.NODE_ENV} mode, on port ${appConfig.port}`));
        }
        catch (err: any) {
            console.log(err);
        }
    }

    // Register middleware:
    private registerMiddleware(): void {

        this.server.use(expressRateLimit({ windowMs: 1000, max: 25 }));
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use("/api", authController.router);
        this.server.use("*", errorsMiddleware.routeNotFound);
        this.server.use(errorsMiddleware.catchAll);
    }
}

(async () => {
    const app = new App();
    await app.start();
})();
