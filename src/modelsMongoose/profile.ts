import mongoose, { Schema } from "mongoose";

const ProfileSchema = new mongoose.Schema({
    _idUser: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { type: String, required: true },
    email: { type: String, required: true },
    oAuthClientPlatform: {
        type: [{
            platform: String,
            infoConnect: String
        }]
    },
});
export default mongoose.model('Profile', ProfileSchema);