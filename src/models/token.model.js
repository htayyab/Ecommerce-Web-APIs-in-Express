import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token : {
        type : String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: { expires: '5m' } // Token expires after 1 hour
    }
},{ timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

export default Token;