const express = require('express');
const helmet = require('helmet');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(helmet()); // this protects our app

server.use('/api/actions', actionsRouter);  // router for actions
server.use('/api/projects', projectsRouter); // router for projects

// eslint-disable-next-line no-unused-vars
server.use((err,req,res,next) => {              //this catches all problems if used next(err)
    res.status(500).json({
        message:"There's a problem!",
        error: err.message
    })
})

server.use('*',(req,res) => {                   // this let user know that everything is ok with API, just wrong page picked up
    res.send('<h1>API is working! But page not found!</h1>')
})

module.exports = server;
