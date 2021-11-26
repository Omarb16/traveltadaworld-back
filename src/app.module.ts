import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [UsersModule, TripsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
