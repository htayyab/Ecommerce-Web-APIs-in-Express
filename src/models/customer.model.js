import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    referral: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required : false
    }]
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
