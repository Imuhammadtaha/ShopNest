import express from "express";
import { isAdmin, requireSignin } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  categoryPhotoController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes

// This is for Creating category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);

// This is for Updating category
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

//Get all category
router.get("/get-category", categoryController);

//single Category
router.get("/single-category/:slug", singleCategoryController);
//deleting category
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);

//Category Photo
router.get("/category-photo/:pid", categoryPhotoController);

export default router;
