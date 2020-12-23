import { Router } from "express";
import { Model, Types } from "mongoose";
import VerifyToken from "../Functions/Verify";
import { ProjectInfo } from "../Models/Projects";
import jwt from "jsonwebtoken";
import { SecretKey } from "../Config/config";

const router = Router();
const Projects: Model<ProjectInfo> = require("../Models/Projects");

interface DeleteProjectProps {
    projectID: string;
}

// @route  GET /Projects
// @desc   Get All Posts
// @access Public

router.get("/", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        res.send(
            await Projects.find({
                userID: authData.user._id,
            })
        );
    });
});

// @route  POST /Projects
// @desc   Create Project
// @access Public

router.post("/", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { title } = req.body;

            const info = {
                title: title,
                userID: authData.user._id,
            };

            const newProject = new Projects(info);

            await newProject
                .save()
                .then(async () => {
                    res.send(
                        await Projects.find({
                            userID: info.userID,
                        })
                    );
                })
                .catch((err) => {
                    res.status(403).send(err);
                });
        }
    });
});

// @route  POST /Projects/delete
// @desc   Delete Project
// @access Public

router.post("/delete", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const deleteParams: DeleteProjectProps = req.body;
            await Projects.findOne({
                _id: deleteParams.projectID,
                userID: authData.user._id,
            })
                .then(async (project) => {
                    await project
                        ?.remove()
                        .then(() => res.send({ success: true }));
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        }
    });
});

module.exports = router;

// jwt.verify(req.token, SecretKey, async (err, authData) => {
//     if (err) {
//         res.sendStatus(403);
//     } else {
//     }
// });
