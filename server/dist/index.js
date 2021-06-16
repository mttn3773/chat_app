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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = require("http");
const passport_1 = __importDefault(require("passport"));
const redis_1 = require("redis");
require("reflect-metadata");
const socket_io_1 = require("socket.io");
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
const index_1 = require("./config/index");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const passport_2 = require("./utils/passport");
const app = express_1.default();
const server = http_1.createServer(app);
const io = new socket_io_1.Server(server);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection(config_1.default.ormConfig);
        app.use(body_parser_1.json());
        app.use(body_parser_1.urlencoded({ extended: false }));
        app.use(cors_1.default());
        app.use(cookie_parser_1.default(index_1.SESSION_SECRET));
        const RedisStore = connect_redis_1.default(express_session_1.default);
        const redisClient = redis_1.createClient();
        app.use(express_session_1.default(Object.assign(Object.assign({}, config_1.default.session), { store: new RedisStore({ client: redisClient, disableTouch: true }) })));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        let allUsers = [];
        io.on("connection", (socket) => {
            console.log(`User connected`);
            socket.on("join server", ({ username }) => {
                const user = { username, id: socket.id };
                allUsers.push(user);
                io.emit("new user", allUsers);
            });
            socket.emit("your id", socket.id);
            socket.on("send message", (body) => {
                io.emit("message", body);
            });
            socket.on("disconnect", () => {
                allUsers = allUsers.filter(({ id }) => id !== socket.id);
                io.emit("new user", allUsers);
            });
        });
        passport_1.default.use(passport_2.localStrategy);
        app.use("/api/users", user_routes_1.default);
        app.use("/api/auth", auth_routes_1.default);
        server.listen(config_1.default.server.port, () => {
            console.log(`App is running on port ${config_1.default.server.port}`);
        });
    }
    catch (e) { }
}))();
exports.default = app;
//# sourceMappingURL=index.js.map