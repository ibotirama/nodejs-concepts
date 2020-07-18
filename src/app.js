const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  let repository = {id:uuid(), title, url, techs, likes:0};
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  let repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex === -1){
    response.statusMessage = 'Respository não encontrado.';
    return response.status(400).end();
  }
  const {title, url, techs} = request.body;
  repository = {id, title, url, techs, likes: repositories[repositoryIndex].likes};
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;
  let repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex === -1){
    response.statusMessage = 'Respository não encontrado.';
    return response.status(400).end();
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).end();
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;
  let repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex === -1){
    response.statusMessage = 'Respository não encontrado.';
    return response.status(400).end();
  }
  const likes = repositories[repositoryIndex].likes++;
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
