import express from "express";
import {
  countAllProducts,
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/getall", getAllProducts);
productRouter.get("/count", countAllProducts);
productRouter.get("/get", getSingleProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete", deleteProduct);

export default productRouter;
