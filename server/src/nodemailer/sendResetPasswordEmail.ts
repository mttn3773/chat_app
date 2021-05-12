import { smtpTransport } from "./smtpTransport";

export const sendResetPasswordEmail = async (
  to: string,
  token: string,
  url: string
) => {
  try {
    const mailOptions = {
      from: "Chat App",
      to,
      subject: "Reset Password",
      text: `Click this link to reset your password <a>${url}/reset-password?token=${token}</a>`,
    };
    const data = await smtpTransport.sendMail(mailOptions);
    return data;
  } catch (e) {
    console.log(e);
  }
};
