import { Document, Schema } from "mongoose";
import { dal } from "../2-utils/dal";

export interface IItemModel extends Document {
    name: string;
    description: string;
}

export const ItemSchema = new Schema<IItemModel>({
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

}, { versionKey: false, timestamps: true });

export const ItemModel = dal.idleGameConnection.model<IItemModel>("ItemModel", ItemSchema, "Items");
