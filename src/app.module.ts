import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import * as Config from 'config';

@Module({
  imports: [
    UsersModule,
    TripsModule,
    //MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    MongooseModule.forRoot('mongodb://localhost:27017/tadaweb'),
  ],
})
export class AppModule {}
