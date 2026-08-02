import type { Request, Response } from 'express';
import { TaskService } from '../services/taskService.js';

const service = new TaskService();

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const task = await service.create({ title, description });
      
      return res.status(201).json(task);
      
    } catch (error) {
      return res.status(400).json({ erro: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const completed = req.query.completed as string | undefined;
      const tasks = await service.getAll(completed);

      return res.status(200).json(tasks);
    
    } catch (error) {
      return res.status(400).json({ erro: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const task = await service.getById(id);

      return res.json(task);
    
    } catch (error) {
      return res.status(404).json({ erro: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const updatedTask = await service.update(id, req.body);

      return res.status(200).json(updatedTask);
    
    } catch (error) {
      return res.status(404).json({ erro: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      await service.delete(id);
      
      return res.status(204).send();
    
    } catch (error) {
      return res.status(404).json({ erro: (error as Error).message });
    }
  }
}

export { TaskController };