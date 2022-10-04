import { Router } from "express";
import database from "../db/database.js";

const router = Router();

router.post('/docs', async (req, res) => {
    const db = await database.getDb();

    const result = await db.collection.insertOne({ title: req.body.title, body: req.body.body })
        .then(db.client.close());

    console.log(result)
    return res.send(result);
});

export default router;
