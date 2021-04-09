const Projects = require('../projects/projects-model'); // this needs to get an access to projects actions

const checkProjId = async (req,res,next) => {   // checks if project exists with provided id
    const {id} = req.params;
    const project = await Projects.get(id);
    if(project){
        req.project = project;          // save found project to req.project, we'll need this later
        next()
    }
    else{
        res.status(404).json({message:"project not found"})
    }
}

const checkProj = (req,res,next) => {      // checks created/updated project's body
    const check = req.body;
    if (check.name && check.description){
        next()
    }
    else{
        res.status(400).json({message:"error! name, description fields required"})
    }
}

module.exports = {checkProjId, checkProj}   //export middlewares