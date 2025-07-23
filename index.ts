import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import itemRoutes from './routes/items';
import cloudinaryRoutes from './routes/cloudinary';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/cloudinary', cloudinaryRoutes);

app.get('/', (req, res) => {
  res.send('RentPal Backend is live!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
