"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmOptions = void 0;
const common_utils_1 = require("./utils/common.utils");
const PostgressConnectionStringParser = __importStar(require("pg-connection-string"));
const databaseUrl = process.env.DATABASE_URL || "";
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
exports.typeOrmOptions = {
    type: "postgres",
    host: connectionOptions.host || "localhost",
    port: parseInt(connectionOptions.port) || 5432,
    username: connectionOptions.user || "postgres",
    password: connectionOptions.password || "postgres",
    database: connectionOptions.database || "chat_app",
    synchronize: !common_utils_1.__prod__(),
    ssl: common_utils_1.__prod__(),
    logging: !common_utils_1.__prod__(),
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
    },
};
//# sourceMappingURL=ormconfig.js.map