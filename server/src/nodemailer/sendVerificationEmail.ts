import { smtpTransport } from "./smtpTransport";

console.log(smtpTransport);

export const sendVerificationEmail = async (to: string, token: string) => {
  try {
    const mailOptions = {
      from: "Chat App",
      to,
      subject: "Verify your email",
      text: token,
    };
    const data = await smtpTransport.sendMail(mailOptions);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
