import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

app.listen(process.env.PORT, () => {
    console.log('====================================');
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    console.log('====================================');
})
