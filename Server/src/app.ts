import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { globalError } from "./middlewares/errorHandler";


const app = express();
app.use(express.json())

// Routes
app.get("/", (req: Request, res: Response) => {

  return res.status(200).json({
    message: "Welcome to Book API 🚀",
    success: true,
    status: 200,
    timestamp: new Date().toISOString(),
  });
});



// Example: handle 404 (route not found)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Route not found"));
});

// Global error handler 
app.use(globalError);

export default app;