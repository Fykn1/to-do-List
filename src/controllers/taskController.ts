import type { Request, Response } from 'express';
import { TaskService } from '../services/taskService.js';

const service = new TaskService();

class TaskController {
  create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const task = service.create({ title, description });
      
      return res.status(201).json(task);
      
    } catch (error) {
      return res.status(400).json({ erro: (error as Error).message });
    }
  }

  list(req: Request, res: Response) {
    try {
      const completed = req.query.completed as string | undefined;
      const tasks = service.list(completed);

      return res.status(200).json(tasks);
    
    } catch (error) {
      return res.status(400).json({ erro: (error as Error).message });
    }
  }

  listById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const task = service.listById(id);

      return res.json(task);
    
    } catch (error) {
      return res.status(404).json({ erro: (error as Error).message });
    }
  }

  update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const updatedTask = service.update(id, req.body);

      return res.status(200).json(updatedTask);
    
    } catch (error) {
      return res.status(404).json({ erro: (error as Error).message });
    }
  }

  delete(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      service.delete(id);
      
      return res.status(204).send();
    
    } catch (error) {
      return res.status(404).json({ erro: (error as Error).message });
    }
  }
}

export { TaskController };