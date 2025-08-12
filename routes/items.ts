import express from "express";
import { createItem, getAllItems } from "../controllers/itemController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getAllItems);

// Middleware wrapper
router.post("/", requireAuth, createItem);

export default router;
