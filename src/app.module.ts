import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';
import * as Config from 'config';

@Module({
  imports: [
    UsersModule,
    TripsModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ],
})
export class AppModule {}
