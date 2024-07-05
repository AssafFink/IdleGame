import dotenv from "dotenv";

dotenv.config();

// App config: 
class AppConfig {
    public readonly isDevelopment = (process.env.NODE_ENV === "development");
    public readonly isProduction = (process.env.NODE_ENV === "production");
    public readonly port = 8000;
    public readonly idleGameConnectionString = `mongodb://127.0.0.1:27017/IdleGame`;
}

// Create correct config object based on environment:
export const appConfig = new AppConfig();
