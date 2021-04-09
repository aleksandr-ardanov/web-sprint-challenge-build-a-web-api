// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {checkProjId, checkProj} = require('../middlewares/projects-middleware')

const router = express.Router();


router.get('/',(req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', checkProjId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', checkProj, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', checkProjId, checkProj, (req, res, next) => {
    const {id} = req.params;
    Projects.update(id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', checkProjId, (req, res, next) => {
    const {id} = req.params;
    Projects.remove(id)
        .then(() => {
          res.status(200).json({message:"successfully deleted",deleted:req.project}) 
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id/actions', checkProjId,(req, res, next) => {
    const {id} = req.params;
    Projects.getProjectActions(id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            next(err)
        })
})

router.use((err,req,res,next) => {
    res.status(500).json({
        message:"there's a problem!",
        error: err.message
    })
})

module.exports = router;