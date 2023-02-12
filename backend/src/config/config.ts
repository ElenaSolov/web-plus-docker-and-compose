export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  db: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    databaseName: process.env.POSTGRES_DB || 'kupipodariday',
  },
  JWT_Secret: process.env.JWT_SECRET || 'anotherSecretKey',
});
