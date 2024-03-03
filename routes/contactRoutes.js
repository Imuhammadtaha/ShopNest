import express from "express";
import { contactController } from "../controllers/contactController.js";
const router = express.Router();

router.post("/contact-now", contactController);
export default router;
