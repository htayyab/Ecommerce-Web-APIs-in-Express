import mongoose from 'mongoose';
import Permission from './permission.model.js';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    
}, {
    timestamps: true,
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
