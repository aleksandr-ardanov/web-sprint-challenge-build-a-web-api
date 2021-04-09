// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const {validateActionId, validateAction} = require('../middlewares/actions-middleware');

const router = express.Router();


router.get('/',(req, res, next) => {
    Actions.get()
        .then(allActions => {
            res.status(200).json(allActions)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id',validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/',validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id',validateActionId, validateAction, (req, res, next) => {
    const {id} = req.params;
    Actions.update(id, req.body)
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id',validateActionId, (req, res, next) => {
    const {id} = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(200).json({message:"successfully deleted", deleted:req.action})
        })
        .catch(err => {
            next(err)
        })
})

// eslint-disable-next-line no-unused-vars
router.use((err,req,res,next) => {
    res.status(500).json({
        message:"there's a problem!",
        error: err.message
    })
})

module.exports = router;