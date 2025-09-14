import dotenv from "dotenv"
dotenv.config();


const _config = {

  
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  BASE_PATH: process.env.BASE_PATH,
  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_MAILER_SENDER: process.env.RESEND_MAILER_SENDER,

  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
}

export const _Config = Object.freeze(_config)