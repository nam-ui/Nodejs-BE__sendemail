import mongoose, { Schema } from "mongoose";

const CustomersSchema = new mongoose.Schema({
    _idUser: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },
    avatar: { type: String },
});

export default mongoose.model('Customers', CustomersSchema);