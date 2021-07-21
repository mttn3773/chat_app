import { __prod__ } from "./utils/common.utils";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
const databaseUrl: string = process.env.DATABASE_URL || "";
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
export const typeOrmOptions: PostgresConnectionOptions = {
  type: "postgres",
  host: connectionOptions.host || "localhost",
  port: parseInt(connectionOptions.port!) || 5432,
  username: connectionOptions.user || "postgres",
  password: connectionOptions.password || "postgres",
  database: connectionOptions.database || "chat_app",
  synchronize: !__prod__(),
  ssl: __prod__(),
  logging: !__prod__(),
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
