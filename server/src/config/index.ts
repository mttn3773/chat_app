import { config } from "dotenv";
import { SessionOptions } from "express-session";

config();

const PORT = process.env.PORT || 4000;
export const SESSION_SECRET = process.env.SESSION_SECRET;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
export default {
  nodemailer: {
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASSWORD,
    },
  },
  session: {
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 3600 * 24 * 365 * 10,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
  } as SessionOptions,
  server: {
    port: PORT,
  },
};
