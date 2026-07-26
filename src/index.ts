import express from 'express';
import { resourceUsage } from 'node:process';

const app = express();

interface Tasks {
  id: number,
  title: string,
  description: string,
  completed: boolean
}

const tasks: Tasks[] = [];

app.use(express.json());

app.post('/tasks', (req, res) => {
  const newTask: Tasks = {
    id: Math.floor(Math.random() * 100),
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed
  };
  tasks.push(newTask);

  return res.status(201).send({ message: 'Task enviada' });
})

app.get('/tasks', (req, res) => {
  const completed = req.query.completed;
  let result = tasks;

  if (completed !== undefined) {
    if (completed === "false") {
      result = result.filter((task) => task.completed === false);
    } else {
      result = result.filter((task) => task.completed === true);
    }
  }

  res.status(200).json(result);
});

app.get('/tasks/:id', (req, res) => {
  const id: number = Number(req.params.id);
  const task = tasks.find((e) => e.id === id);

  if(!task) {
    return res.status(404).json({ message: "404: Task not found" });
  }

  return res.json(task);
})

app.put('/tasks/:id', (req, res) => {
  const id: number = Number(req.params.id);
  const task = tasks.find((e) => e.id === id);

  if(!task) {
    return res.status(404).json({ message: "404: Task not found" });
  }

  task.title = req.body.title;
  task.description = req.body.description;
  task.completed = req.body.completed;

  return res.status(200).send({ message: 'Task atualizada' });
})

app.delete('/tasks/:id', (req, res) => {
  const id: number = Number(req.params.id);
  const taskIndex = tasks.findIndex((e) => e.id === id);

  if(taskIndex === -1) {
    return res.status(404).json({ message: "404: Task not found" });
  }

  tasks.splice(taskIndex, 1);

  return res.status(200).send({ message: 'Task deletada' });
})

app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${3000}`);
});