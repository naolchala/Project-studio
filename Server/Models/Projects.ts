import { Document, Model, model, Schema, SchemaTypes } from "mongoose";

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userID: {
        type: SchemaTypes.ObjectId,
        required: true
    }
})

export interface ProjectInfo extends Document {
    title: string,
    userID: string
}

const ProjectModel: Model<ProjectInfo> = model("projects", ProjectSchema);

module.exports = ProjectModel;