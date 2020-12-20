import {Schema, Model, Document, model} from "mongoose";


const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})


export interface UserInfo extends Document {
    fullname: string,
    email: string,
    password: string,
}


const UserModel: Model<UserInfo> = model("Users", UserSchema);

module.exports = UserModel;