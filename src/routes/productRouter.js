import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/getall", getAllProducts);
productRouter.get("/get", getSingleProduct);

export default productRouter;
