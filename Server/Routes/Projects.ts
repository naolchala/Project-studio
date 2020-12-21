import { Router } from "express";
import { Model, Types } from "mongoose";
import { ProjectInfo } from "../Models/Projects";

const router = Router();
const Projects: Model<ProjectInfo> = require("../Models/Projects");

interface DeleteProjectProps {
    projectID: string,
    userID: string
}

// @route  GET /Projects
// @desc   Get All Posts
// @access Public

router.get("/", async (req, res) => {
    res.send(await Projects.find({}))
})

// @route  POST /Projects
// @desc   Create Project
// @access Public

router.post("/", async (req, res) => {
    const info: ProjectInfo  = req.body;
    const newProject = new Projects(info);
    
    await newProject.save().then(async ()=>{
        res.send(await Projects.find({
            userID: info.userID
        }))
    }).catch(err => {
        res.status(403).send(err);
    })
})

// @route  POST /Projects/delete
// @desc   Delete Project
// @access Public

router.post("/delete", async (req, res)=>{
    const deleteParams: DeleteProjectProps = req.body;
    await Projects.findOne({
        _id: deleteParams.projectID,
        userID: deleteParams.userID
    }).then(async (project) => {
        await project?.remove().then(() => res.send({success:true}))
    }).catch(err => {
        res.status(404).send(err)
    })
})



module.exports = router;