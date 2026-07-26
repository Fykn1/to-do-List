import express from 'express';

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

  return res.status(201).send( { message: 'Task enviada' });
})

app.get('/tasks', (req, res) => {
  res.status(200).json( tasks );
});

app.get('/tasks/:id', (req, res) => {
  const id: number = Number(req.params.id);

  const task = tasks.find((e) => e.id === id);

  if(!task) {
    return res.status(404).json( { message: "404: Task not found" } );
  }

  return res.json(task);
})

app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${3000}`);
});