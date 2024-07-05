import mongoose from "mongoose";
import { appConfig } from "./app-config";

// Data access layer, containing all connection objects:
class DAL {
    public readonly idleGameConnection = mongoose.createConnection(appConfig.idleGameConnectionString);
}

export const dal = new DAL();
