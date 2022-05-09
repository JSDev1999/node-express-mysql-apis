import express from "express";
import {
  getAllUsers,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/auth/register", registerUser);
userRouter.post("/auth/login", loginUser);

userRouter.get("/getuser", getUserData);

userRouter.get("/getall", getAllUsers);

export default userRouter;
