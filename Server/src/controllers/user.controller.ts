import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { findByIdUserService } from "../services/user.Service";


export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?._id; // type-safe if you have custom Request type

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

    const user= await findByIdUserService(userId)

      res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        user, 
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);