import express from "express";
import { all, newDiary, single, updateDiary, deleteDiary } from "../controllers/diary.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/new", auth, newDiary);
router.get("/all", auth, all);
router.get("/single/:id", auth, single);
router.put("/single/:id", auth, updateDiary); // Add update route
router.delete("/single/:id", auth, deleteDiary); // Add delete route

export default router;
