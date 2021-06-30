"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtpTransport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const { auth } = config_1.default.nodemailer;
exports.smtpTransport = nodemailer_1.default.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
    auth,
});
//# sourceMappingURL=smtpTransport.js.map