import { Router } from "express";
import { Model } from "mongoose";
import LoadDetails from "../Functions/Details";
import { StageInfo } from "../Models/Stages";
import { TaskInfo } from "../Models/Tasks";

const router = Router();
const Stages: Model<StageInfo> = require("../Models/Stages");
const Tasks: Model<TaskInfo> = require("../Models/Tasks");

// @router GET /Stages/:id
// @desc   Returns Stages in Project
// @access Public

router.get("/:projectID", async (req, res) => {
    const { projectID } = req.params;

    await LoadDetails(projectID).then((resp) => {
        res.send(resp);
    });
});

// @router POST /Stages/
// @desc Creates a stage
// @access Public

router.post("/", async (req, res) => {
    const data: StageInfo = req.body;
    const newStage = new Stages(data);

    await newStage
        .save()
        .then(async () => {
            res.send(await Stages.find({}));
        })
        .catch((err) => res.status(402).send(err));
});

// @router POST /Stages/delete
// @desc Deletes a Stage
// @access Public

router.post("/delete", async (req, res) => {
    const { stageID } = req.body;

    await Stages.findById(stageID)
        .then((stage) =>
            stage?.remove().then(() => res.send({ success: true }))
        )
        .catch((err) => res.status(404).send(err));
});

module.exports = router;
