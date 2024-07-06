import { Document, Schema } from "mongoose";
import { dal } from "../2-utils/dal";

export interface IEquipmentModel extends Document {
    name: string;
    description: string;
    skillSpeed: number;
    icon: string;
}

export const EquipmentSchema = new Schema<IEquipmentModel>({
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
        required: [true, "Missing Skill Speed"],
        max: 100,
        trim: true,
        unique: true
    },

    icon: {
        type: String,
        required: [true, "Missing icon link."],
        maxlength: 255,
        trim: true,
        unique: true
    },

}, { versionKey: false, timestamps: true });

export const EquipmentModel = dal.idleGameConnection.model<IEquipmentModel>("EquipmentModel", EquipmentSchema, "Equipments");
