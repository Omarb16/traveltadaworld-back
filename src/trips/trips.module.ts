import { Logger, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TripsDao } from './trips.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './trip.shema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as Config from 'config';
import { UsersDao } from 'src/users/users.dao';
import { User, UserSchema } from 'src/users/user.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Config.get<string>('jwt.secret'),
    }),
  ],
  controllers: [TripsController],
  providers: [TripsService, Logger, TripsDao, UsersDao],
})
export class TripsModule {}
