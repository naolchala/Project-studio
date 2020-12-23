import { Router } from "express";
import { Model } from "mongoose";
import LoadDetails from "../Functions/Details";
import { StageInfo } from "../Models/Stages";
import { TaskInfo } from "../Models/Tasks";
import jwt from "jsonwebtoken";
import VerifyToken from "../Functions/Verify";
import { SecretKey } from "../Config/config";

const router = Router();
const Tasks: Model<TaskInfo> = require("../Models/Tasks");
const Stages: Model<StageInfo> = require("../Models/Stages");

// @router POST /tasks/
// @desc   Creates Tasks
// @body   stageID, Details

router.post("/", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const data: TaskInfo = req.body;
            const newTask = new Tasks(data);

            await newTask
                .save()
                .then(async (doc) => {
                    await Stages.findById(doc.stageID).then(async (stage) => {
                        await LoadDetails(stage?.projectID).then((d) => {
                            res.send(d);
                        });
                    });
                })
                .catch((err) => {});
        }
    });
});

// @router POST /Tasks/delete
// @desc   Delete Task
// @access Public

router.post("/delete", async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { taskID } = req.body;
            await Tasks.findById(taskID)
                .then(async (doc) => {
                    doc?.remove();
                    await Stages.findById(doc?.stageID).then(async (stage) => {
                        await LoadDetails(stage?.projectID).then((d) => {
                            res.send(d);
                        });
                    });
                })
                .catch((err) => res.status(404).send(err));
        }
    });
});

module.exports = router;
