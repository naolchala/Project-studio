import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})


interface UserInfo {
    _id: string,
    fullname: string,
    email: string,
    password: string,
    __v: number
}


const UserModel: Mongoose.Model<Mongoose.Document<UserInfo>, {}> = Mongoose.model("Users", UserSchema);

module.exports = UserModel;