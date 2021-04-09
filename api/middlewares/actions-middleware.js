const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

const validateActionId = async (req,res,next) => {
    const {id} = req.params;
    const action = await Actions.get(id);
    if(action){
        req.action = action;
        next()
    }
    else{
        res.status(404).json({message:"action not found"})
    }

}

const validateAction = async (req,res,next) => {
    const check = req.body;
    if(check.project_id && check.description && 
        check.description.length <=128 && check.notes){
       const projId = await Projects.get(check.project_id);
       projId
       ? next()
       : res.status(404).json({message:`project with id: ${check.project_id} does not exist yet`})
    }
    else{
        res.status(400).json({message:"error! project_id, description(up to 128 symbols) and notes fields required"})
    }

}

module.exports = {
    validateActionId,
    validateAction
}