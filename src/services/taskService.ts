import type { Tasks } from '../models/taskModel.js';

const tasks: Tasks[] = [];

class TaskService {
  create({ title, description }: Omit<Tasks, 'id' | 'completed'>) {
    if (!title) {
      throw new Error("Tarefa deve haver título");
    }

    const newTask = { 
      id: Math.floor(Math.random() * 100), 
      title, 
      description,
      completed: false 
    };

    tasks.push(newTask);
    return newTask;
  }

  list(completed?: string) {
    let result = tasks;

    if (completed !== undefined) {
      if (completed === "false") {
        result = result.filter((task) => task.completed === false);
      } else {
        result = result.filter((task) => task.completed === true);
      }
    }
    
    return result;
  }

  listById(id: number) {
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

  delete(id: number) {
    const taskIndex = tasks.findIndex((e) => e.id === id);

    if(taskIndex === -1) {
      throw new Error("404: Task not found");
    }

    tasks.splice(taskIndex, 1);
  }
}

export { TaskService };