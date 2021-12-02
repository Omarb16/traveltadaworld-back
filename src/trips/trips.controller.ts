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
  ApiOkResponse, ApiParam,
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
   * Handler to answer in to GET /trips/find/:id route
   *
   * @param {HandlerParams} params trip id
   *
   * @returns Observable<TripEntity>
   */
    @ApiOkResponse({
    description: 'Return a trip',
    type: TripEntity,
  })
  @ApiNotFoundResponse({
    description: 'Trip with the given "id" doesn\'t exist in the database',
  })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiParam({
      name: 'id',
      description: 'Unique identifier of the person in the database',
      type: String,
      allowEmptyValue: false,
    })
  @Get('find/:id')
  find(@Param() params: HandlerParams): Observable<TripEntity> {
    return this._tripsService.find(params.id);
  }

  /**
   * Handler to answer in to GET /trips/finddetail/:id route
   *
   * @param {HandlerParams} params trip id
   * @param {string} auth user authorization
   *
   * @returns Observable<TripEntity>
   */
  @ApiOkResponse({
    description: 'Return a trip',
    type: TripDetailEntity,
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
   * @param {TripQuery} query search query
   *
   * @returns Observable<TripEntity[]>
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
   * Handler to answer in to GET /trips/usertrips route
   *
   * @param {SortPagin} query sort and pagination query
   * @param {string} auth user authorization
   *
   * @returns Observable<TripEntity[]>
   */
  @ApiOkResponse({
    description: 'Return user trips',
    type: TripFunderEntity,
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
   * @param {SortPagin} query sort and pagination query
   * @param {string} auth user authorization
   *
   * @returns Observable<TripEntity[]>
   */
  @ApiOkResponse({
    description: 'Return traveler trips',
    type: TripTravelerEntity,
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
   * Handler to answer in to GET /trips/countusertrips route
   *
   * @param {string} auth user authorization
   *
   * @returns Observable<number>
   */
  @ApiOkResponse({
    description: 'Return user trips length',
    type: Number,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Get('countusertrips')
  countUserTrips(@Headers('authorization') auth: string): Observable<number> {
    return this._tripsService.countUserTrips(auth);
  }
  /**
   * Handler to answer in to GET /trips/counttravelertrips route
   *
   * @param {string} auth user authorization
   *
   * @returns Observable<number>
   */
  @ApiOkResponse({
    description: 'Return traveler trips length',
    type: Number,
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
   * Handler to answer in to GET /trips/count route
   *
   * @returns Observable<number>
   */
  @ApiOkResponse({
    description: 'Return trips length',
    type: Number,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get('count')
  count(): Observable<number> {
    return this._tripsService.count();
  }

  /**
   * Handler to answer in to GET /trips/firsttree route
   *
   * @returns Observable<TripEntity[]>
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
   * Handler to answer in to POST /trips route
   *
   * @param {CreateTripDto} tripDto data to create
   * @param {Express.Multer.File} file file to upload
   * @param {string} auth user authorization
   *
   * @returns Observable<TripEntity>
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
   * Handler to answer in to PUT /trips/update/:id route
   *
   * @param {HandlerParams} params trip id
   * @param {UpdateTripDto} trip data to update
   * @param {Express.Multer.File} file fie to upload
   * @param {string} auth user authorization
   *
   * @returns Observable<TripEntity>
   */
  @ApiOkResponse({
    description: 'Update a trip',
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
   * Handler to answer in to POST /delete/:id route
   *
   * @param {HandlerParams} params trip id
   * @param {string} auth user authorization
   *
   * @returns Observable<void>
   */
  @ApiOkResponse({
    description: 'Return a trip',
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
   * Handler to answer in to DELETE /trips/cancel/:id route
   *
   * @param {HandlerParams} params trip id
   * @param {string} auth user authorization
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
   * Handler to answer in to POST /trips/demand/:id route
   *
   * @param {HandlerParams} params trip id
   * @param {HandlerName} body name
   * @param {string} auth user authorization
   *
   * @returns Observable<TripEntity | void>
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
   * Handler to answer in to POST /trips/accept/:id route
   *
   * @param {HandlerParams} params trip id
   * @param {HandlerParams} user user accepted id
   * @param {string} auth user authoriazation
   *
   * @returns Observable<TripEntity | void>
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
   * Handler to answer in to PUT /trips/decline/:id route
   *
   * @param {HandlerParams} params trip id
   * @param {HandlerParams} user id user declined
   * @param {HandlerParams} auth user authorization
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
