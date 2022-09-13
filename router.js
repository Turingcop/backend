import { Router } from "express";
import database from "./db/database.js";
import { ObjectId } from "mongodb";

const router = Router();

router.get('/', function(req, res, next) {
    const data = { data: { msg: "Hello World" } };
    return res.json(data);
});

router.get('/docs', async (req, res) => {
    const db = await database.getDb();
    const result = await db.collection.find({}).toArray()
        .then(db.client.close());
    return res.json(result);
});

router.post('/docs', async (req, res) => {
    const db = await database.getDb();
    console.log(req.body);
    const result = await db.collection.insertOne({ title: req.body.title, body: req.body.body })
        .then(db.client.close());
    return res.send(result.insertedId);
});

router.put('/docs', async (req, res) => {
    const db = await database.getDb();
    console.log(req.body);
    const filter = { _id: new ObjectId(req.body._id) };
    const update = {
        $set: {
            title: req.body.title,
            body: req.body.body
        }
    };
    await db.collection.updateOne(filter, update)
        .then(db.client.close());
    return res.send(req.body._id);
});

export default router;