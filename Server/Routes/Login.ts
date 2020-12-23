import { Router } from "express";
import { Model, Document, Types } from "mongoose";
import { UserInfo } from "../Models/User";
import jwt from "jsonwebtoken";
import { SecretKey } from "../Config/config";
import VerifyToken from "../Functions/Verify";

const router = Router();
const User: Model<UserInfo> = require("../Models/User");

interface LoginRequestProps {
    email: string;
    password: string;
}

export const Authenticate = async (token: string) => {
    let data = false;
    await User.findOne({
        _id: token,
    })
        .then(() => {
            data = true;
        })
        .catch(() => {
            data = false;
        });

    return data;
};
// @route /
// @access Public
// @actoion ListUser

router.get("/", VerifyToken, async (req, res) => {
    jwt.verify(req.token, SecretKey, async (err: any, authData: any) => {
        if (err) {
            res.sendStatus(403);
        } else {
            console.log(authData);
            await User.find({}).then((docs) => res.send(docs));
        }
    });
});

// @route POST /Users/login/
// @desc  Login Users
// @access Public

router.post("/login", async (req, res) => {
    const auth: LoginRequestProps = req.body;
    await User.findOne(auth)
        .then((doc) => {
            const user: any = doc;

            // Generate Token
            jwt.sign({ user }, SecretKey, (err, token) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send({ token });
                }
            });
        })
        .catch((err) => res.sendStatus(404));
});

// @route  POST /Users/create
// @desc   Create Users
// @access Public

router.post("/create", async (req, res) => {
    const user: UserInfo = req.body;
    const newUser = new User(user);

    await newUser
        .save()
        .then(async () => {
            res.send(await User.find({}));
        })
        .catch((err) => res.status(403).send(err));
});

router.get("/auth/:token", async (req, res) => {
    res.send(await Authenticate(req.params.token));
});

module.exports = router;
