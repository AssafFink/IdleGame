import { Document, Schema } from "mongoose";
import { dal } from "../2-utils/dal";

export interface ISkillModel extends Document {
    name: string;
    description: string;
    levels: number;
    icon: string;
}

export const SkillSchema = new Schema<ISkillModel>({
    name: {
        type: String,
        required: [true, "Missing name."],
        maxlength: 50,
        match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "Invalid email address."],
        trim: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: 50,
        match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "Invalid Description."],
        trim: true,
        lowercase: true,
        unique: true
    },    
    levels: {
        type: Number,
        max: 100,
        match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "Invalid Level."],
        trim: true,
        unique: true
    },
    icon: {
        type: String,
        maxlength: 250,
        trim: true,
        lowercase: true,
        unique: true
    }
}, { versionKey: false, timestamps: true });

export const SkillModel = dal.idleGameConnection.model<ISkillModel>("SkillModel", SkillSchema, "Skills");
