import nodemailer from "nodemailer";
import config from "../config";
const { auth } = config.nodemailer;

export const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth,
});
