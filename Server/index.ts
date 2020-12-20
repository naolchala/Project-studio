import Express from "express";
import {connect, } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import {MongoUrl} from "./Config/config";

const app = Express();
const Users = require("./Routes/Login");

connect(MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongo Connected")).catch(err => console.log(err))

app.use(cors());
app.use(bodyParser.json());

app.use("/Users/" , Users);

app.get("/:name", (req, res) => {
    const name:string = req.params.name;
    res.send(`<h1>Welcome Mr. ${name}</h1>`);
})


const port: number = 5000;

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})