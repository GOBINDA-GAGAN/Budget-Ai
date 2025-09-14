import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { LoginSchemaType, RegisterSchemaType } from "../validators/auth.validator";
import ReportSettingModel, { ReportFrequencyEnum } from "../models/report-setting.model";
import { calculateNextReportDate } from "../utils/helper";



export const registerService = async (body: RegisterSchemaType) => {
  const { email } = body;

  // check if user exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // create new user
  const newUser = await UserModel.create(body);

  // create report setting
  await ReportSettingModel.create({
    userId: newUser._id,
    frequency: ReportFrequencyEnum.MONTHLY,
    isEnabled: true,
    lastSentDate: null,
    nextReportDate: calculateNextReportDate(),
  });

  return { user: newUser.omitPassword() };
};




