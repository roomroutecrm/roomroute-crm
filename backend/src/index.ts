import express from 'express';
import cors from 'cors';
import authRoutes from './auth/routes'; // Make sure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON

// Routes
app.use('/auth', authRoutes); // Register/login routes

// Root route
app.get('/', (req, res) => {
  res.send('RoomRoute CRM backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
