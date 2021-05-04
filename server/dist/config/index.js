"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_SECRET = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const PORT = process.env.PORT || 4000;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
exports.default = {
    nodemailer: {
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASSWORD,
        },
    },
    session: {
        secret: exports.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 3600 * 24 * 365 * 10,
            httpOnly: true,
        },
        resave: false,
        saveUninitialized: false,
    },
    server: {
        port: PORT,
    },
};
//# sourceMappingURL=index.js.map