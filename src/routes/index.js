import express from "express";
import productRouter from "./productRouter.js";

const appRouter = express.Router();

appRouter.use("/products", productRouter);

export default appRouter;
