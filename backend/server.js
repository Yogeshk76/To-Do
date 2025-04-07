import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 3000;



app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)



connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});


