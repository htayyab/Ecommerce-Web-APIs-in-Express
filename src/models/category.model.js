import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
