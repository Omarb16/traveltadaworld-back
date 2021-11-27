import { TripsService } from './trips.service';
import { TripEntity } from './entities/trip.entity';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { Observable } from 'rxjs';
import { HandlerParams } from 'src/validators/handler-params';

@ApiTags('trips')
@Controller('trips')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class TripsController {
  /**
   * Class constructor
   * @param _tripsService
   */
  constructor(private readonly _tripsService: TripsService) {}

  /**
   * Handler to answer in to POST /users/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return a trip',
    type: TripEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  find(@Param() params: HandlerParams): Observable<TripEntity> {
    return this._tripsService.find(params.id);
  }
}
