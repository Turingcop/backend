import express, { json } from "express";
import morgan from 'morgan';
import cors from 'cors';
import get from "./router/get.js";
import post from "./router/post.js";
import put from "./router/put.js";
import del from "./router/delete.js";
import logIncoming from "./middleware/index.js";
import dotenv from 'dotenv';
dotenv.config();
console.log("APP")
console.log(process.env);
const app = express();
const port = process.env.PORT || 1337;

app.use(cors());
app.use(json());
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
app.use((req, res, next) => {
    logIncoming(req, res, next);
});

app.use("/", get, put, post, del);
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

export default server;
