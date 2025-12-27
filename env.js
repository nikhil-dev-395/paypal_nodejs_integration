import { config } from "dotenv";
config();
const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET ?? "",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID ?? "",
  PAYPAL_BASE_URL: process.env.PAYPAL_BASE_URL ?? "",
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
};

export default env;
