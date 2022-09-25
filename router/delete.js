import { Router } from "express";
import database from "../db/database.js";
import { ObjectId } from "mongodb";

const router = Router();

router.delete('/docs', async (req, res) => {
    const db = await database.getDb();

    const filter = { _id: new ObjectId(req.body._id) };

    await db.collection.deleteOne(filter)
        .then(db.client.close());
    return res.send(req.body._id);
});

export default router;
