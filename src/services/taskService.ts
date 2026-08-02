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

  async getById(id: number) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      throw new Error("404: Task not found");
    }

    return task;
  }

  async update(id: number, data: Partial<Tasks>) {
    try {
      const task = await prisma.task.update({
        where: { id },
        data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.completed !== undefined && { completed: data.completed })
      }
      })

      return task;
    
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('404: Task not found');
      }
      
      throw error;
    }
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