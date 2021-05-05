"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_SECRET = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const ORM_CONFIG = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "chat_app",
    synchronize: true,
    logging: true,
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
    },
};
const PORT = process.env.PORT || 4000;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
exports.default = {
    ormConfig: ORM_CONFIG,
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