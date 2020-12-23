import { Router } from "express";
import { Model } from "mongoose";
import LoadDetails from "../Functions/Details";
import { StageInfo } from "../Models/Stages";
import { TaskInfo } from "../Models/Tasks";
import jwt from "jsonwebtoken";
import { SecretKey } from "../Config/config";
import VerifyToken from "../Functions/Verify";

const router = Router();
const Stages: Model<StageInfo> = require("../Models/Stages");
const Tasks: Model<TaskInfo> = require("../Models/Tasks");

// @router GET /Stages/:id
// @desc   Returns Stages in Project
// @access Public

router.get("/:projectID", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { projectID } = req.params;

            await LoadDetails(projectID).then((resp) => {
                res.send(resp);
            });
        }
    });
});

// @router POST /Stages/
// @desc Creates a stage
// @access Public

router.post("/", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const data: StageInfo = req.body;
            const newStage = new Stages(data);

            await newStage
                .save()
                .then(async () => {
                    res.send(await Stages.find({}));
                })
                .catch((err) => res.status(402).send(err));
        }
    });
});

// @router POST /Stages/delete
// @desc Deletes a Stage
// @access Public

router.post("/delete", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { stageID } = req.body;

            await Stages.findById(stageID)
                .then((stage) =>
                    stage?.remove().then(() => res.send({ success: true }))
                )
                .catch((err) => res.status(404).send(err));
        }
    });
});

module.exports = router;
