import { config } from "dotenv";
import { SessionOptions } from "express-session";
import { ConnectionOptions } from "typeorm";

config();
const ORM_CONFIG: ConnectionOptions = {
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

const PROFILE_PICTURES_FOLDER = "../client/build/uploads/profile-pictures";
const DEFAULT_PROFILE_PICTURE = "default.svg";

const JWT_SERCRET = process.env.JWT_SECRET;

const PORT = process.env.PORT || 4000;

export const SESSION_SECRET = process.env.SESSION_SECRET;

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

export default {
  jwtSecret: JWT_SERCRET,
  ormConfig: ORM_CONFIG,
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
  folders: {
    profilePicturesFolder: PROFILE_PICTURES_FOLDER,
    defaultProfilePicture: DEFAULT_PROFILE_PICTURE,
  },
};
