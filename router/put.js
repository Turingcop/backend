import { Router } from "express";
import database from "../db/database.js";
import { ObjectId } from "mongodb";

const router = Router();

router.put('/docs', async (req, res) => {
    const db = await database.getDb();

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
