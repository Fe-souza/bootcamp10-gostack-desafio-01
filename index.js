const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

const projectsLength = projects.length;

function projectExists(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if(!project){
    return res.status(400).json({error: 'Project not exists!'});
  }
  return next();
}

function countRequests(req, res, next) {

  console.count("Number of requests");

  return next();
}



// Listing all projects and their tasks
server.get('/projects',countRequests, (req, res)=>{
  return res.json(projects)
});

// Creating a new project
server.post('/projects',countRequests, (req, res)=>{
  const { id, title } = req.body;


  const arrayProject = {
    id,
    title,
    tasks: []
  };

  projects.push(arrayProject);

  return res.json(projects)
});

//Update project
server.put('/projects/:id',projectExists,countRequests, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project)
});



// Adding a new task
server.post('/projects/:id/tasks',projectExists,countRequests, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(project)
});


// Delete project
server.delete('/projects/:id',projectExists,countRequests, (req, res)=>{
  const { id } = req.params;
  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.send()
});



server.listen(3000);