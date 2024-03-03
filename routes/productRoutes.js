import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  UpdateProductController,
  brainTreePaymentController,
  brainTreeTokenController,
  categoryProductController,
  createProductController,
  deleteproductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

//updating
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  UpdateProductController
);

//get all product
router.get("/get-products", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteproductController);

//filters Product
router.post("/product-filters", productFilterController);

//product Count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//Search product
router.get("/search/:keyword", searchController);

//Related or Similar Products
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise products
router.get("/product-category/:slug", categoryProductController);

//Payment routes token
router.get("/braintree/token", brainTreeTokenController);

//Payemnts
router.post("/braintree/payment", requireSignin, brainTreePaymentController);

export default router;
