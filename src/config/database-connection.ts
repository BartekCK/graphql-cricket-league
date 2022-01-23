import { Connection, createConnection } from "typeorm";
import * as path from "path";

export const startDatabaseConnection = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
        ? Number.parseInt(process.env.DB_PORT as string)
        : undefined,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, "../entities/*{.ts,.js}")],
      migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],
      migrationsRun: true,
      logging: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    });
    console.log("Connection with database started");

    return connection;
  } catch (e) {
    console.log("There was a problem with database connection");
    console.log(e.message);
    throw e;
  }
};
