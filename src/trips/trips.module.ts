import { Logger, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TripsDao } from './trips.dao';

@Module({
  providers: [TripsService],
  controllers: [TripsController, Logger, TripsDao],
})
export class TripsModule {}
