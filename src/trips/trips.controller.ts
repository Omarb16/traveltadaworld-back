import { TripsService } from './trips.service';
import { TripEntity } from './entities/trip.entity';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers,
  UseInterceptors,
  UseGuards,
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
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { AuthGuard } from '@nestjs/passport';

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
   * Handler to answer in to GET /trips/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   *
   * @returns Observable<TripEntity| void>
   */
  @ApiOkResponse({
    description: 'Return a trip',
    type: TripEntity,
  })
  @ApiNotFoundResponse({
    description: 'Trip with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  find(@Param() params: HandlerParams): Observable<TripEntity> {
    return this._tripsService.find(params.id);
  }

  /**
   * Handler to answer in to GET /trips route
   *
   * @returns Observable<TripEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return trips',
    type: TripEntity,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  findAll(): Observable<TripEntity[]> {
    return this._tripsService.findAll();
  }

  /**
   * Handler to answer in to GET /trips route
   *
   * @returns Observable<TripEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return trips',
    type: TripEntity,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Get('usertrips')
  findUserTrips(
    @Headers('authorization') auth: string,
  ): Observable<TripEntity[]> {
    return this._tripsService.findUserTrips(auth);
  }

  /**
   * Handler to answer in to POST /trips/:id route
   *
   * @param {TripDto} trip data to create
   *
   * @returns Observable<TripEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Create a trip',
    type: TripEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body() tripDto: CreateTripDto,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity> {
    return this._tripsService.create(tripDto, auth);
  }

  /**
   * Handler to answer in to POST /trips/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   * @param {TripDto} trip data to update
   *
   * @returns Observable<TripEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return a trip',
    type: TripEntity,
  })
  @ApiNotFoundResponse({
    description: 'Trip with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() tripDto: UpdateTripDto,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity> {
    return this._tripsService.update(params.id, tripDto, auth);
  }

  /**
   * Handler to answer in to POST /trips/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   *
   * @returns Observable<TripEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return a trip',
    type: TripEntity,
  })
  @ApiNotFoundResponse({
    description: 'Trip with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(
    @Param() params: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<void> {
    return this._tripsService.delete(params.id, auth);
  }
}
