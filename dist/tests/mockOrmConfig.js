"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockOrmConfig = void 0;
const createMockOrmConfig = () => {
    return {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "chat_app_test",
        synchronize: true,
        logging: false,
        entities: ["dist/entity/**/*.js"],
        migrations: ["dist/migration/**/*.js"],
        subscribers: ["dist/subscriber/**/*.js"],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber",
        },
    };
};
exports.createMockOrmConfig = createMockOrmConfig;
//# sourceMappingURL=mockOrmConfig.js.map