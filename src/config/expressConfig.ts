import express from 'express';
import { taskRoutes } from '../routes/taskRoute';

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);

export { app };