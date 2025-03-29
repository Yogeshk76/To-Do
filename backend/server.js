import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send('Hello World!');
}
);



app.listen(port, () => {
  connectDB();
  console.log('Server is running on port 3000');
}
);

