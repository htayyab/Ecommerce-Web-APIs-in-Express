import mongoose from 'mongoose';
import User from "./user.model.js";

const employeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        default: null
    },
},{ timestamps : true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
