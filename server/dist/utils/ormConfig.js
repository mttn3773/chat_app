"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
//# sourceMappingURL=ormConfig.js.map