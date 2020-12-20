"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const express_1 = require("express");
const router = express_1.Router();
const User = require("../Models/User");
const Authenticate = async (token) => {
    let data = false;
    await User.findOne({
        _id: token
    }).then(() => {
        data = true;
    }).catch(() => {
        data = false;
    });
    return data;
};
exports.Authenticate = Authenticate;
// @route /
// @access Public
// @actoion ListUser
router.get("/", async (req, res) => {
    res.send(await User.find({}));
});
router.post("/login", async (req, res) => {
    const auth = req.body;
    await User.findOne(auth).then(doc => {
        const user = doc;
        res.send({
            token: user._id,
            fullname: user.fullname
        });
    }).catch(err => res.sendStatus(404));
});
router.post("/create", async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    await newUser.save().then(async () => {
        res.send(await User.find({}));
    }).catch(err => res.status(403).send(err));
});
router.get("/auth/:token", async (req, res) => {
    res.send(await exports.Authenticate(req.params.token));
});
module.exports = router;
//# sourceMappingURL=Login.js.map