import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  addReplyController,
  addReviewController,
  getReviewController,
  getUserController,
} from "../controllers/userController.js";
//router object
const router = express.Router();

router.get("/get-users", requireSignin, isAdmin, getUserController);
router.get("/get-user-review", getReviewController);
router.post("/add-review/:uid", requireSignin, addReviewController);
router.post("/review-reply/:uid", requireSignin, isAdmin, addReplyController);
export default router;
