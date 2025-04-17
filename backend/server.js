import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import cors from 'cors';
import {connectDB} from './config/db.js';
import authRoutes from './routes/auth.route.js';

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }
  );
}
).catch((err) => {
  console.error(
    'Failed to connect to MongoDB', err
  );
  process.exit(1);
}
);