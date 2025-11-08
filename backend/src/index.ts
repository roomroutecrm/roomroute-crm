import express from 'express';
import cors from 'cors';
import authRoutes from './auth/routes'; // adjust if your path is different

const app = express();
const PORT = process.env.PORT || 3000;

// CORS settings to allow frontend connection
const corsOptions = {
  origin: [
    'https://roomroute-crm-production-c6ef.up.railway.app', // Railway frontend
    'http://localhost:3000' // Local testing (optional)
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('RoomRoute CRM backend is running!');
});

// Auth routes
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
