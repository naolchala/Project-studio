import {Router} from "express";
import {Model, Document, Types} from "mongoose";
import { UserInfo } from "../Models/User";

const router = Router();
const User: Model<UserInfo> = require("../Models/User");

interface LoginRequestProps {
    email: string,
    password: string
}

export const Authenticate = async (token: string) => {
    let data = false;
    await User.findOne({
        _id: token
    }).then(
        () => {
            data = true
        }
    ).catch(() => {
        data = false;
    })

    return data;
}
// @route /
// @access Public
// @actoion ListUser


router.get("/", async (req,res) => {
    res.send(await User.find({}));
})

router.post("/login" , async (req, res) => {
    const auth:LoginRequestProps = req.body;
    await User.findOne(auth).then(doc => {
        const user: any = doc;
        res.send({
            token: user._id,
            fullname: user.fullname
        })
    }).catch(err => res.sendStatus(404));
})


router.post("/create", async (req, res) => {
    const user: UserInfo = req.body;
    const newUser = new User(user);
    
    await newUser.save().then( async () => {
        res.send(await User.find({}))
    }).catch(err => res.status(403).send(err))
})

router.get("/auth/:token", async (req, res) => {
    res.send(await Authenticate(req.params.token));
})

module.exports = router;