import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';

export default {
  imports: [ConfigModule],
  useFactory: async (
    config: ConfigService,
  ): Promise<MongooseModuleFactoryOptions> => ({
    uri: config.get('DB_HOST'),
    retryAttempts: 1,
    retryDelay: 1000,
  }),
  inject: [ConfigService],
} as MongooseModuleAsyncOptions;
