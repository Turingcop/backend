import { Router } from "express";
import get from "./get.js";
import post from "./post.js";
import put from "./put.js";
import del from "./delete.js";
const router = Router();

router.use("/", get, post, put, del);
export default router;
