// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model'); // access to actions 
const {validateActionId, validateAction} = require('../middlewares/actions-middleware'); // import middlewares

const router = express.Router();

router.get('/',(req, res, next) => {       //gets all actions
    Actions.get()
        .then(allActions => {
            res.status(200).json(allActions)
        })
        .catch(err => {
            next(err)               //if getting an error it pushes it to the middleware which catches errors
        })
})

router.get('/:id',validateActionId, (req, res) => {         //gets a specific action by id if it exists
    res.status(200).json(req.action)
})

router.post('/',validateAction, (req, res, next) => {   //adds an action
    Actions.insert(req.body)        
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id',validateActionId, validateAction, (req, res, next) => {       //updates an action if it exists
    const {id} = req.params;
    Actions.update(id, req.body)
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id',validateActionId, (req, res, next) => {              //deletes an action if it exists
    const {id} = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(200).json({message:"successfully deleted", deleted:req.action})
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router;        // export