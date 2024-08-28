import mongoose from 'mongoose';
import Role from "./role.model.js"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required : true
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
