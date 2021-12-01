import { JwtModule } from '@nestjs/jwt';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.shema';
import { NotificationsController } from './notifications.controller';
import { NotificationsDao } from './notifications.dao';
import { NotificationsService } from './notifications.service';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/users/user.shema';
import { UsersDao } from 'src/users/users.dao';
import * as Config from 'config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Config.get<string>('jwt.secret'),
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, Logger, NotificationsDao, UsersDao],
})
export class NotificationsModule {}
