import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    avatar: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    refreshToken: { type: String }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);