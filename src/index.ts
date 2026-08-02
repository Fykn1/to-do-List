import express from 'express';
import { taskRoutes } from './routes/taskRoute.js';
import { app } from './config/expressConfig';

const PORT = 3333;

app.use(express.json());
app.use(taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});