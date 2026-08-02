import { prisma } from '../config/prismaClient.js';
import type { Tasks } from '../models/taskModel.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

class TaskService {
  async create({ title, description }: Omit<Tasks, 'id' | 'completed'>) {
    if (!title) {
      throw new Error("Tarefa deve haver título");
    }

    const newTask = await prisma.task.create({
      data: { 
        title, 
        description,
        completed: false 
      }
    });

    return newTask;
  }

  async getAll(completed?: string) {
    const where: { completed?: boolean } = {};

    if (completed !== undefined) {
      where.completed = completed === 'true';
    }
    
    return await prisma.task.findMany({
      where
    })
  }

  getById(id: number) {
    const task = tasks.find((e) => e.id === id);

    if(!task) {
      throw new Error("404: Task not found");
    }

    return task;
  }

  update(id: number, data: Partial<Tasks>) {
    const task = tasks.find((e) => e.id === id);

    if(!task) {
      throw new Error("404: Task not found");
    }


    task.title = data.title ?? task.title;
    task.description = data.description ?? task.description;
    task.completed = data.completed ?? task.completed;

    return task;
  }

  async delete(id: number) {
    try {
      await prisma.task.delete({ where: { id } });
    
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Tarefa não encontrada.');
      }
      throw error;
    } 
  }
}

export { TaskService };