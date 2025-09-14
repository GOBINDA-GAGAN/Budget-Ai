import  express  from "express";
import { registerController } from "../controllers/auth.controller";
const authRoute=express.Router();

authRoute.post("/register",registerController)


export default authRoute;