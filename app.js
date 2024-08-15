import express from 'express';
import connectDB from './src/config/db.js';
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

connectDB();

// Middlewares
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
