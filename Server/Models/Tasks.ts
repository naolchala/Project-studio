import { Document, model, Model, Schema, SchemaTypes } from "mongoose";

// Task Schema
const TaskSchema = new Schema({
    stageID: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
});

// Defining Interface
export interface TaskInfo extends Document {
    stageID: string;
    details: string;
}

// Creating Model
const TaskModel: Model<TaskInfo> = model("tasks", TaskSchema);

module.exports = TaskModel;
