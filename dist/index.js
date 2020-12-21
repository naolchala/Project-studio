"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./Config/config");
// Importing
const app = express_1.default();
const Users = require("./Routes/Login");
const Projects = require("./Routes/Projects");
const Stages = require("./Routes/Stage");
const Tasks = require("./Routes/Task");
// Mongo Connection
mongoose_1.connect(config_1.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log(err));
// parsers
app.use(cors_1.default());
app.use(body_parser_1.default.json());
// routes
app.use("/Users/", Users);
app.use("/Projects/", Projects);
app.use("/Stages/", Stages);
app.use("/Tasks/", Tasks);
app.get("/:name", (req, res) => {
    const name = req.params.name;
    res.send(`<h1>Welcome Mr. ${name}</h1>`);
});
const port = 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
//# sourceMappingURL=index.js.map