export = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/*{.ts,.js}"],
  migrations: ["src/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities",
  },
  synchronize: false,
  logging: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
