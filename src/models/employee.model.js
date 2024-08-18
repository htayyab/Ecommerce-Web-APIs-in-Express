import mongoose from 'mongoose';
import User from "./user.model.js";

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
        required: true
    }
},{ timestamps : true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
