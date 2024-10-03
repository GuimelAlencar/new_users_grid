import express from 'express';
import cors from 'cors';
const app = express();
const port = 8080;

import userRoutes from './routes/users.js';

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});