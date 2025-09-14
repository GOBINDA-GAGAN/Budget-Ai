import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService } from "../services/auth.Service";



export const registerController = async (req: Request, res: Response) => {
  try {
    const body = registerSchema.parse(req.body);
    const result = await registerService(body);

    return res.status(201).json({
      message: "User register successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: "Registration failed",
        error: error.message,
      });
    }
    return res.status(400).json({
      message: "Registration failed",
      error: "Something went wrong",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);
    const { user, accessToken, expiresAt, reportSetting } = await loginService(body);

    return res.status(200).json({
      message: "User logged in successfully",
      user, accessToken, expiresAt, reportSetting
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: "Login failed",
        error: error.message,
      });
    }
    return res.status(400).json({
      message: "Login failed",
      error: "Something went wrong",
    });
  }
}
