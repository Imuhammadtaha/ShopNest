import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  orderStatusController,
  getAllOrdersController,
} from "../controllers/authController.js";

import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();
//routing

//Register Router || METHOD POST
router.post("/register", registerController);

//login router || METHOD POST
router.post("/login", loginController);

//Forgor Password || POST
router.post("/forgot-password", forgotPasswordController);

//test Route
router.get("/test", requireSignin, isAdmin, testController);

//protected user auth route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin auth route
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put("/profile", requireSignin, updateProfileController);

//Orders
router.get("/orders", requireSignin, getOrdersController);

//All-Orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);

//Order status Update
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);

export default router;
