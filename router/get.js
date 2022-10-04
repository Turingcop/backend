import { Router } from "express";
import database from "../db/database.js";
import { docs } from "../ioserver.js";

const router = Router();

router.get('/docs', async (req, res) => {
    const db = await database.getDb();
    const result = await db.collection.find({}).toArray()
        .then(db.client.close());

    return res.json(result);
});

router.get("/docs/:id", (req, res) => {
    const id = req.params.id;
    const doc = docs[id];

    if (doc) {
        return res.json(doc);
    }
    return res.json({ _id: "", body: "", title: "" });
});

export default router;
