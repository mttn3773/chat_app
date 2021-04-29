"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_SECRET = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const PORT = process.env.PORT || 4000;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.default = {
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