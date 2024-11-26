import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true ,required: true},
    password: {type: String, required: true},
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default model('User', userSchema);