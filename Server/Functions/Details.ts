import { Model, Types } from "mongoose";
import { StageInfo } from "../Models/Stages";
import { TaskInfo } from "../Models/Tasks";

const Stages: Model<StageInfo> = require("../Models/Stages");
const Tasks: Model<TaskInfo> = require("../Models/Tasks");

const LoadDetails = async (projectID?: string) => {
    return await Stages.find({
        projectID: projectID,
    }).then((stages) => {
        return Promise.all(
            stages.map((stage) => {
                return LoadStages(stage);
            })
        );
    });
};

const LoadStages = async (stage: StageInfo) => {
    return await LoadTasks(stage._id).then((tasks) => {
        return {
            stageID: stage._id,
            stageTitle: stage.title,
            tasks: tasks,
        };
    });
};

const LoadTasks = async (stageID: string) => {
    return await Tasks.find({
        stageID: stageID,
    }).then((tasks) => {
        return tasks.map((task) => {
            return {
                taskID: task._id,
                details: task.details,
            };
        });
    });
};
export default LoadDetails;
