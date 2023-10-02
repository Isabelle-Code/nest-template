import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import database from './database';

@Module({
  imports: [MongooseModule.forRootAsync(database)],
})
export default class DatabaseModule {}
