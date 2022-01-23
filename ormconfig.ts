export = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  // subscribers: ['**/*.subscriber{ .ts,.js }'],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities",
    // subscribersDir: 'dist/**/**.subscriber{.ts,.js}',
  },
  synchronize: false,
  // migrationsRun: true,
  logging: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
