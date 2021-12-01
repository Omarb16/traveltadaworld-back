import { SortPagin } from './../validators/sort-pagin';
import { HandlerName } from './../validators/handler-name';
import { TripFunderEntity } from './entities/trip-funder.entity';
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
  Query,
  UploadedFile,
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
import { TripQuery } from 'src/validators/trip-query';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/validators/file-helper';
import { TripTravelerEntity } from './entities/trip-traveler.entity';
import { TripDetailEntity } from './entities/trip-detail.entity';

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
  @Get('find/:id')
  find(@Param() params: HandlerParams): Observable<TripEntity> {
    return this._tripsService.find(params.id);
  }

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
  @Get('finddetail/:id')
  findDetail(
    @Param() params: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<TripDetailEntity> {
    return this._tripsService.findDetail(params.id, auth);
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
  findAll(@Query() query: TripQuery): Observable<TripEntity[]> {
    return this._tripsService.findAll(query);
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
    @Query() query: SortPagin,
    @Headers('authorization') auth: string,
  ): Observable<TripFunderEntity[]> {
    return this._tripsService.findUserTrips(query, auth);
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
  @Get('travelertrips')
  findTravelerTrips(
    @Query() query: SortPagin,
    @Headers('authorization') auth: string,
  ): Observable<TripTravelerEntity[]> {
    return this._tripsService.findTravelerTrips(query, auth);
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
  @Get('countusertrips')
  countUserTrips(@Headers('authorization') auth: string): Observable<number> {
    return this._tripsService.countUserTrips(auth);
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
  @Get('counttravelertrips')
  countTravelerTrips(
    @Headers('authorization') auth: string,
  ): Observable<number> {
    return this._tripsService.countTravelerTrips(auth);
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
  @Get('firsttree')
  findFirstTree(): Observable<TripEntity[]> {
    return this._tripsService.findFirstTree();
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  create(
    @Body() tripDto: CreateTripDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity> {
    return this._tripsService.create(tripDto, file.filename, auth);
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Put('update/:id')
  update(
    @Param() params: HandlerParams,
    @Body() tripDto: UpdateTripDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity> {
    return this._tripsService.update(params.id, tripDto, file, auth);
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
  @Delete('delete/:id')
  delete(
    @Param() params: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<void> {
    return this._tripsService.delete(params.id, auth);
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
  @Delete('cancel/:id')
  cancel(
    @Param() params: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity> {
    return this._tripsService.cancel(params.id, auth);
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
  @Put('demand/:id')
  demand(
    @Param() params: HandlerParams,
    @Body() body: HandlerName,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity | void> {
    return this._tripsService.demand(params.id, body.name, auth);
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
  @Put('accept/:id')
  accept(
    @Param() params: HandlerParams,
    @Body() user: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity | void> {
    return this._tripsService.accept(params.id, user.id, auth);
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
  @Put('decline/:id')
  decline(
    @Param() params: HandlerParams,
    @Body() user: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity | void> {
    return this._tripsService.decline(params.id, user.id, auth);
  }
}
