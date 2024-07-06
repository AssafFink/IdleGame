import { Document, Schema } from "mongoose";
import { dal } from "../2-utils/dal";

export interface IUserModel extends Document {
    email: string;
    username: string;
    password: string;
}

export const UserSchema = new Schema<IUserModel>({
    email: {
        type: String,
        required: [true, "Missing email address."],
        maxlength: 255,
        match: [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "Invalid email address."],
        trim: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "Missing username."],
        minlength: 4,
        maxlength: 30,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Missing password."],
        minlength: [6, "Password must be 6 chars."],
        maxlength: [128, "Password must be 128 chars."],
    }
}, { versionKey: false, timestamps: true });

export const UserModel = dal.idleGameConnection.model<IUserModel>("UserModel", UserSchema, "users");
