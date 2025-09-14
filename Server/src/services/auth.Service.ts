import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { LoginSchemaType, RegisterSchemaType } from "../validators/auth.validator";
import ReportSettingModel, { ReportFrequencyEnum } from "../models/report-setting.model";
import { calculateNextReportDate } from "../utils/helper";
import { signJwtToken } from "../utils/jwt";



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

export const loginService = async (body: LoginSchemaType) => {

  const { email, password } = body;

  const user = await UserModel.findOne({ email })
  if (!email) {
    throw new Error("Email/Password not found");
  }

  const isPasswordValid = await user?.comparePassword(password)

  if (!isPasswordValid) {
    throw new Error("Email/Password not found");
  }

  const { token, expiresAt } = signJwtToken({ userId: user?.id });

  const reportSetting = await await ReportSettingModel.findOne({ userId: user?.id }, {
    _id: 1, frequency: 1, isEnabled: 1
  }).lean();

  return {
    user: user?.omitPassword(),
    accessToken: token,
    expiresAt,
    reportSetting
  }

}


