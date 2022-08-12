import mongoose, { Schema } from "mongoose";

const SampleLetterSchema = new mongoose.Schema({
    _idUser: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: { type: String, },
    text: { type: String, },
    html: { type: String, },
    attachments: { type: String },
});

export default mongoose.model('SampleLetter', SampleLetterSchema);