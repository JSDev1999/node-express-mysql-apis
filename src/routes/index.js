import express from "express";
import imageRouter from "./imageRouter.js";
import productRouter from "./productRouter.js";

const appRouter = express.Router();

appRouter.use("/products", productRouter);
appRouter.use("/images", imageRouter);

export default appRouter;
