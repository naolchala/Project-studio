import { Document, model, Model, Schema, SchemaTypes } from "mongoose";

// Stage Schema
const StageSchema = new Schema({
    projectID: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

// Stage Type
export interface StageInfo extends Document {
    projectID: string,
    title: string
}
// stage model
const StageModel: Model<StageInfo> = model("stages", StageSchema);

module.exports = StageModel;