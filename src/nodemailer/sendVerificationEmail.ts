import { smtpTransport } from "./smtpTransport";

export const sendVerificationEmail = async (
  to: string,
  token: string,
  url: string
) => {
  try {
    const mailOptions = {
      from: "Chat App",
      to,
      subject: "Verify your email",
      text: `Click this link to verify your email <a>${url}/verify?token=${token}&email=${to}</a>`,
    };
    const data = await smtpTransport.sendMail(mailOptions);
    return data;
  } catch (e) {
    console.log(e);
  }
};
