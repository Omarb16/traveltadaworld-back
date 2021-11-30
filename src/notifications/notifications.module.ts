import { NotificationsService } from './notifications.service';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.shema';
import { NotificationsDao } from './notifications.dao';
import { UsersDao } from 'src/users/users.dao';
import { NotificationsController } from './notifications.controller';
import { User, UserSchema } from 'src/users/user.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, Logger, NotificationsDao, UsersDao],
})
export class NotificationsModule {}
