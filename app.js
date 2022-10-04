import express, { json } from "express";
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import logIncoming from "./middleware/index.js";
import router from "./router/router.js";
import { ioServer } from "./ioserver.js";

dotenv.config();
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

app.use("/", router);

app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

const server = ioServer(app);

server.listen(port);

export default server;
