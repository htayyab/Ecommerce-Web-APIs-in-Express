import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import categoryRoutes from './src/routes/category.routes.js';

const app = express();

connectDB();

// Middleware setup
app.use(helmet()); 
app.use(cors());
app.use(express.static('public')); 
app.use(express.json()); 
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: false })); 

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

app.use('/api/', authRoutes); 
app.use('/api/categories', categoryRoutes); 

// Global error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ status: 'error', message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
