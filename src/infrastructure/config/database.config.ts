export interface DatabaseConfig {
  db: {
    port: number;
    host: string;
    username: string;
    password: string;
    databaseName: string;
  };
}

export default (): DatabaseConfig => ({
  db: {
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    databaseName: process.env.DB_NAME || 'nest-template',
  },
});
