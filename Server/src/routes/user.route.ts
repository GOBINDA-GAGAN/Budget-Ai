import  express  from "express";
import {getCurrentUserController } from "../controllers/user.controller";
const userRoute=express.Router();

userRoute.get("/current-user",getCurrentUserController)



export default userRoute;