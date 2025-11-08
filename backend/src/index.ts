import express from 'express';
import cors from 'cors';
import authRoutes from './auth/routes';  // Adjust path if needed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('RoomRoute CRM backend is running!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
