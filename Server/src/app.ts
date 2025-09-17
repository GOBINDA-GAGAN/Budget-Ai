import "./config/passport.config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { globalError } from "./middlewares/errorHandler";
import authRoute from "./routes/auth.route";
import { _Config } from "./config/config";
import passport from "passport";
import { passportAuthenticateJwt } from "./config/passport.config";
import userRoute from "./routes/user.route";


const app = express();
app.use(express.json())
app.use(passport.initialize())

// welcome-Routes
app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Welcome To Budget-Ai-Backend 🚀",
      success: true,
      status: 200,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in root route:", error);
    return res.status(500).json({
      message: "Server is down, please come later",
      success: false,
      status: 500,
      timestamp: new Date().toISOString(),
    });
  }
});



//auth-route

app.use(`${_Config.BASE_PATH}/auth`, authRoute)
app.use(`${_Config.BASE_PATH}/user`, passportAuthenticateJwt, userRoute)


// Example: handle 404 (route not found)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Route not found"));
});

// Global error handler 
app.use(globalError);

export default app;