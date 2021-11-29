import { TripQuery } from './../validators/trip-query';
import { JwtService } from '@nestjs/jwt';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripEntity } from './entities/trip.entity';
import { TripsDao } from './trips.dao';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  catchError,
  defaultIfEmpty,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { Trip } from './trip.shema';
import * as moment from 'moment';
import * as config from 'config';
const fs = require('fs');

@Injectable()
export class TripsService {
  /**
   * Class constructor
   *
   * @param {TripsDao} _tripsDao instance of the DAO
   */
  constructor(
    private readonly _tripsDao: TripsDao,
    private _jwtService: JwtService,
  ) {}

  /**
   * Returns one trip of the list matching id in parameter
   *
   * @param {string} id of the trip
   *
   * @returns {Observable<TripEntity>}
   */
  find = (id: string): Observable<TripEntity> =>
    this._tripsDao.find(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Trip) => {
        if (fs.existsSync('public/' + _.photo)) {
          _.photo =
            'http://' +
            config.server.host +
            ':' +
            config.server.port +
            '/public/' +
            _.photo;
        } else {
          _.photo = null;
        }
        return !!_
          ? of(new TripEntity(_))
          : throwError(
              () => new NotFoundException(`Trip with id '${id}' not found`),
            );
      }),
    );

  /**
   * Returns one trip of the list matching id in parameter
   *
   *
   * @returns {Observable<TripEntity[]>}
   */
  findUserTrips = (auth: string): Observable<TripEntity[]> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.findUserTrips(userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Trip[]) =>
        _.map((__: Trip) => {
          if (fs.existsSync('public/' + __.photo)) {
            __.photo =
              'http://' +
              config.server.host +
              ':' +
              config.server.port +
              '/public/' +
              __.photo;
          } else {
            __.photo = null;
          }
          return new TripEntity(__);
        }),
      ),
      defaultIfEmpty(undefined),
    );
  };

  /**
   * Returns one trip of the list matching id in parameter
   *
   *
   * @returns {Observable<TripEntity[]>}
   */
  findAll = (query: TripQuery): Observable<TripEntity[]> =>
    this._tripsDao.findAll(query).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Trip[]) =>
        _.map((__: Trip) => {
          if (fs.existsSync('public/' + __.photo)) {
            __.photo =
              'http://' +
              config.server.host +
              ':' +
              config.server.port +
              '/public/' +
              __.photo;
          } else {
            __.photo = null;
          }
          return new TripEntity(__);
        }),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one trip of the list matching id in parameter
   *
   * @param {TripDto} trip of the trip
   *
   * @returns {Observable<TripEntity>}
   */
  create = (
    trip: CreateTripDto,
    filename: string,
    auth: string,
  ): Observable<TripEntity> => {
    trip.createdAt = moment().utc().format();
    trip.createdBy = this._jwtService.verify(auth.replace('Bearer ', '')).sub;
    trip.photo = filename;
    return this._tripsDao.create(trip).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Trip) => new TripEntity(_)),
    );
  };

  /**
   * Returns one trip of the list matching id in parameter
   *
   * @param {string} id of the trip
   * @param {TripDto} trip of the trip
   *
   * @returns {Observable<TripEntity>}
   */
  update = (
    id: string,
    trip: UpdateTripDto,
    file: Express.Multer.File,
    auth: string,
  ): Observable<TripEntity> => {
    const userId = this._jwtService.verify(auth.replace('Bearer ', '')).sub;
    if (file) {
      trip.photo = file.filename;
    } else {
      delete trip.photo;
    }
    trip.updatedAt = moment().utc().format();
    trip.updatedBy = userId;
    return this._tripsDao.update(id, trip, userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Trip) =>
        !!_
          ? of(new TripEntity(_))
          : throwError(
              () => new NotFoundException(`Trip with id '${id}' not found`),
            ),
      ),
    );
  };

  /**
   * Returns one trip of the list matching id in parameter
   *
   * @param {string} id of the trip
   *
   * @returns {Observable<void>}
   */
  delete = (id: string, auth: string): Observable<void> => {
    const userId = this._jwtService.verify(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.delete(id, userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Trip) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Trip with id '${id}' not found`),
            ),
      ),
    );
  };
}
