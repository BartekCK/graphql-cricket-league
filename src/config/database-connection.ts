import { Connection, createConnection } from "typeorm";
import { Player } from "../entities/Player";

export const startDatabaseConnection = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Player],
      synchronize: true,
      logging: true,

    });
    console.log("Connection with database started");

    return connection;
  } catch (e) {
    console.log("There was a problem with database connection");
    console.log(e.message);
    throw e;
  }
};
