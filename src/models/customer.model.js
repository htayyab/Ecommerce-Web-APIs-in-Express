import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    referral: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    }]
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
