import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.shema';
import { UsersDao } from './users.dao';
import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: Config.get<string>('jwt.secret'),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger, UsersDao],
})
export class UsersModule {}
