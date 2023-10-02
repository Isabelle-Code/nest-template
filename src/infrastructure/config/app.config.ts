export interface AppConfig {
  app: {
    port: number;
    env: string;
    logLevel: string;
  };
}

export default (): AppConfig => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'local',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
});
