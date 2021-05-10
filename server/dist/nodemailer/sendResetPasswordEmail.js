"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = void 0;
const smtpTransport_1 = require("./smtpTransport");
const sendResetPasswordEmail = (to, token, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: "Chat App",
            to,
            subject: "Reset Password",
            text: `Click this link to reset your password <a>${url}/reset-password?token=${token}&email=${to}</a>`,
        };
        const data = yield smtpTransport_1.smtpTransport.sendMail(mailOptions);
        return data;
    }
    catch (e) {
        console.log(e);
    }
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=sendResetPasswordEmail.js.map