import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import limiter from './src/middlewares/rateLimitMiddleware.js';
import connectDB from './src/config/db.js';
import authMiddleware from './src/middlewares/authMiddleware.js';
import authRoutes from './src/routes/auth.routes.js';
import categoryRoutes from './src/routes/category.routes.js';
import productRoutes from './src/routes/product.routes.js'
import orderRoutes from "./src/routes/order.routes.js"
const app = express();

connectDB();

// Middleware setup
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routes
app.use('/api/', authRoutes);
app.use(authMiddleware);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
