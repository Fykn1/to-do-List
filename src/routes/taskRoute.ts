import { Router } from 'express';
import { TaskController } from '../controllers/taskController.js';

const taskRoutes = Router(); 
const controller = new TaskController();

taskRoutes.post('/tasks', controller.create);
taskRoutes.get('/tasks', controller.list);
taskRoutes.get('/tasks/:id', controller.listById);
taskRoutes.put('/tasks/:id', controller.update);
taskRoutes.delete('/tasks/:id', controller.delete);

export { taskRoutes };