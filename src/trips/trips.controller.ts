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
  Logger,
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
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() tripDto: UpdateTripDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') auth: string,
  ): Observable<TripEntity> {
    return this._tripsService.update(params.id, tripDto, file.filename, auth);
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
