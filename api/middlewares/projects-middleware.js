const Projects = require('../projects/projects-model');

const checkProjId = async (req,res,next) => {
    const {id} = req.params;
    const project = await Projects.get(id);
    if(project){
        req.project = project;
        next()
    }
    else{
        res.status(404).json({message:"project not found"})
    }
}

const checkProj =  (req,res,next) => {
    const check = req.body;
    if (check.name && check.description){
        next()
    }
    else{
        res.status(400).json({message:"error! name, description fields required"})
    }
}

module.exports = {checkProjId, checkProj}