import "reflect-metadata";
import { json, urlencoded } from "body-parser";
import connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import { createClient } from "redis";
import { createConnection } from "typeorm";
import config from "./config";
import { SESSION_SECRET } from "./config/index";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import { localStrategy } from "./utils/passport";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server);

(async () => {
  try {
    await createConnection(config.ormConfig);
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cors());
    app.use(cookieParser(SESSION_SECRET));
    const RedisStore = connectRedis(session);
    const redisClient = createClient();
    app.use(
      session({
        ...config.session,
        store: new RedisStore({ client: redisClient, disableTouch: true }),
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    io.on("connection", (socket) => {
      console.log(`User connected`);
      socket.emit("your id", socket.id);
      socket.on("send message", (body) => {
        io.emit("message", body);
      });
    });
    passport.use(localStrategy);
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);

    server.listen(config.server.port, () => {
      console.log(`App is running on port ${config.server.port}`);
    });
  } catch (e) {}
})();

export default app;
