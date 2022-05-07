import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/getall", getAllProducts);
productRouter.get("/get", getSingleProduct);
productRouter.put("/update/:id", updateProduct);

export default productRouter;
