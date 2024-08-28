import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: false
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
