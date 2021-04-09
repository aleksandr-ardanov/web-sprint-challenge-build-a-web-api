// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model'); //import actions
const {checkProjId, checkProj} = require('../middlewares/projects-middleware') //import projects middleware

const router = express.Router();


router.get('/',(req, res, next) => {            //gets all projects
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            next(err)   //if getting an error it pushes it to the middleware which catches errors
        })
})

router.get('/:id', checkProjId, (req, res) => {     //gets a specific action by id if it exists
    res.status(200).json(req.project)
})

router.post('/', checkProj, (req, res, next) => {   //adds a project
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', checkProjId, checkProj, (req, res, next) => {    //updates a project if it exists
    const {id} = req.params;
    Projects.update(id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', checkProjId, (req, res, next) => {     //deletes a project if it exists
    const {id} = req.params;
    Projects.remove(id)
        .then(() => {
          res.status(200).json({message:"successfully deleted",deleted:req.project}) 
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id/actions', checkProjId,(req, res, next) => {    //gets all available actions for specific project if it exists
    const {id} = req.params;
    Projects.getProjectActions(id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router;