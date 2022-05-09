import express from "express";
import imageRouter from "./imageRouter.js";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";

const appRouter = express.Router();

appRouter.use("/products", productRouter);
appRouter.use("/user", userRouter);
appRouter.use("/images", imageRouter);

export default appRouter;
