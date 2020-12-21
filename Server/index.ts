import Express from "express";
import { connect } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoUrl } from "./Config/config";

// Importing
const app = Express();
const Users = require("./Routes/Login");
const Projects = require("./Routes/Projects");
const Stages = require("./Routes/Stage");
const Tasks = require("./Routes/Task");

// Mongo Connection
connect(MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log(err));

// parsers
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/Users/", Users);
app.use("/Projects/", Projects);
app.use("/Stages/", Stages);
app.use("/Tasks/", Tasks);

app.get("/:name", (req, res) => {
    const name: string = req.params.name;
    res.send(`<h1>Welcome Mr. ${name}</h1>`);
});

const port: number = 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
