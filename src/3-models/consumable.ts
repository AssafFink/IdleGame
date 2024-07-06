import { Document, Schema } from "mongoose";
import { dal } from "../2-utils/dal";

export interface IConsumableModel extends Document {
    name: string;
    description: string;
    skillSpeed: number;
    skillSpeedTime: number;
}

export const ConsumableSchema = new Schema<IConsumableModel>({
    name: {
        type: String,
        required: [true, "Missing NAme."],
        maxlength: 50,
        trim: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Missing Description."],
        maxlength: 255,
        trim: true,
        unique: true
    },
    skillSpeed: {
        type: Number,
        required: [true, "Missing Skill Speed."],
        max: 100,
    },
    skillSpeedTime: {
        type: Number,
        required: [true, "Missing Skill Speed Time."],
        max: 3600,
    }

}, { versionKey: false, timestamps: true });

export const ConsumableModel = dal.idleGameConnection.model<IConsumableModel>("ConsumableModel", ConsumableSchema, "Consumables");
