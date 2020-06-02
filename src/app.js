const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { body: { title, url, techs } } = request;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);

  response.send(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { 
    body: { title, url, techs },
    params: { id }
  } = request;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes,
  };

  repositories[repositorieIndex] = repositorie;

  response.send(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { params: { id } } = request;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }

  repositories.splice(repositorieIndex, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {
    params: { id }
  } = request;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }

  const repositorie = repositories[repositorieIndex];

  repositorie.likes++;

  response.send(repositorie);
});

module.exports = app;
