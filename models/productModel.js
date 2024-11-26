import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    discription: { type: String, required: true},
    quantity: {type: Number, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}
});

export default model('Product', productSchema);