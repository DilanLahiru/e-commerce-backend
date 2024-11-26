import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error : ', error);
    }
}

export default connectDB;