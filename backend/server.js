import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './src/config/index.js';
import connectDB from './src/config/db.js';
import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js';

import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import razorpayRoutes from './src/routes/razorpayRoutes.js';
import couponRoutes from './src/routes/couponRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';

// Connect to database
connectDB();

const app = express();

// Config
const PORT = config.port;
const NODE_ENV = config.env;

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());

// Webhook routes MUST be mounted BEFORE express.json() so they can receive the raw body
app.use('/api/payments', paymentRoutes);
app.use('/api/payments/razorpay', razorpayRoutes);

app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/categories', categoryRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Use error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
