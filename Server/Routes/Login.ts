import {Router} from "express";
import Mongoose from "mongoose";

const router = Router();
const User:Mongoose.Model<Mongoose.Document<any>> = require("../Models/User");

interface LoginRequestProps {
    email: string,
    password: string
}

interface CreateUserProps {
    fullname: string,
    email: string,
    password: string
}

router.get("/", async (req,res) => {
    res.send(await User.find({}));
})

router.post("/login" , async (req, res) => {
    const {email, password}:LoginRequestProps = req.body;
    await User.findOne({
        email: email,
        password: password
    }).then(doc => {
        res.send(doc)
    }).catch(err => res.status(403).send(err))
})


router.post("/create", async (req, res) => {
    const user:CreateUserProps = req.body;
    const newUser = new User(user);
    
    await newUser.save().then( async () => {
        res.send(await User.find({}))
    }).catch(err => res.status(403).send(err))
})

module.exports = router;