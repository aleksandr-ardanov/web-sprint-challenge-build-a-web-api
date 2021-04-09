const Actions = require('../actions/actions-model');        // this needs to get an access to actions actions
const Projects = require('../projects/projects-model');     // this needs to get an access to projects actions

const validateActionId = async (req,res,next) => {          //checks if action exists with provided id
    const {id} = req.params;
    const action = await Actions.get(id);
    if(action){
        req.action = action;                            // saves an action for further needs
        next()
    }
    else{
        res.status(404).json({message:"action not found"})
    }

}

const validateAction = async (req,res,next) => {            // checks created/updated action's body
    const check = req.body;
    if(check.project_id && check.description &&             
        check.description.length <=128 && check.notes){         // checks if everything matches with requirements
       const projId = await Projects.get(check.project_id);      // checks if project exists with provided id, if not error must be appeared
       projId
       ? next()
       : res.status(404).json({message:`project with id: ${check.project_id} does not exist yet`})      
    }
    else{
        res.status(400).json({message:"error! project_id, description(up to 128 symbols) and notes fields required"})
    }

}

module.exports = {              // export middlewares
    validateActionId,
    validateAction
}