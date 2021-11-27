import { Logger, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TripsDao } from './trips.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './trip.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripsController],
  providers: [TripsService, Logger, TripsDao],
})
export class TripsModule {}
