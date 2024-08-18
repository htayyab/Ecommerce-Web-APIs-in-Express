import mongoose from 'mongoose';
import Permission from './permission.model.js';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    description: {
        type: String,
        required: false,
        trim : true
    },
    
}, {timestamps: true});

const Role = mongoose.model('Role', roleSchema);

export default Role;
