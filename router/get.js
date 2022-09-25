import { Router } from "express";
import database from "../db/database.js";

const router = Router();

router.get('/docs', async (req, res) => {
    const db = await database.getDb();
    const result = await db.collection.find({}).toArray()
        .then(db.client.close());

    return res.json(result);
});

export default router;
