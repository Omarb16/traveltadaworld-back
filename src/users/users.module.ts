import { JwtStrategy } from 'src/auth/jwt-strategy';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.shema';
import { UsersController } from './users.controller';
import { UsersDao } from './users.dao';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as Config from 'config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Config.get<string>('jwt.secret'),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger, UsersDao, JwtStrategy],
})
export class UsersModule {}
