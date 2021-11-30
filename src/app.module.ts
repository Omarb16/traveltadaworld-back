import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import * as Config from 'config';

@Module({
  imports: [
    UsersModule,
    TripsModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    NotificationsModule,
  ],
})
export class AppModule {}
