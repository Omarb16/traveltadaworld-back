import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import * as Config from 'config';
import { AppGateway } from './socket/events.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    TripsModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    NotificationsModule,
    JwtModule.register({
      secret: Config.get<string>('jwt.secret'),
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
