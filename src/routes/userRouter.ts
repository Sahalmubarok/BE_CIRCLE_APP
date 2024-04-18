import { Router } from "express";
import { Login, register, getUsers } from "../controller/user";
import authentication from "../middleware/authentication";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", Login)
userRouter.get("/users", authentication, getUsers)

export default userRouter;