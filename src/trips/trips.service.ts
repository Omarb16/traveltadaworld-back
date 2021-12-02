import { SortPagin } from './../validators/sort-pagin';
import { UsersDao } from './../users/users.dao';
import { TripQuery } from './../validators/trip-query';
import { JwtService } from '@nestjs/jwt';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripEntity } from './entities/trip.entity';
import { TripsDao } from './trips.dao';
import {
  BadRequestException,
  Injectable,
  Logger,
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
import { Traveler, Trip } from './trip.shema';
import * as moment from 'moment';
import * as config from 'config';
import { TripTravelerEntity } from './entities/trip-traveler.entity';
import { TripFunderEntity } from './entities/trip-funder.entity';
import { TripDetailEntity } from './entities/trip-detail.entity';
const fs = require('fs');
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.shema';

@Injectable()
export class TripsService {
  /**
   * Class constructor
   *
   * @param {TripsDao} _tripsDao instance of the DAO
   */
  constructor(
    private readonly _tripsDao: TripsDao,
    private readonly _userDao: UsersDao,
    private _jwtService: JwtService,
  ) {}

  /**
   * find detail trip
   *
   * @param {string} id trip id
   * @param {string} auth user authorization
   *
   * @returns {Observable<TripEntity>}
   */
  findDetail = (id: string, auth: string): Observable<TripDetailEntity> => {
    var userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.find(id).pipe(
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
        var t = new TripDetailEntity(_);
        t.canDemand =
          t.createdBy != userId && !t.travelers.some((e) => e.user == userId);
        t.canCancel = t.travelers.some(
          (e) => e.user == userId && e.accept == null && e.decline == null,
        );
        return !!_
          ? of(t)
          : throwError(
              () => new NotFoundException(`Trip with id '${id}' not found`),
            );
      }),
    );
  };

  /**
   * find trip by id
   *
   * @param {string} id trip id
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
   * find user trips
   *
   * @param {SortPagin} query query to sort and pagination
   * @param {string} auth user authorization
   *
   * @returns {Observable<TripFunderEntity[]>}
   *
   */
  findUserTrips = (
    query: SortPagin,
    auth: string,
  ): Observable<TripFunderEntity[]> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.findUserTrips(query, userId).pipe(
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
          if (__.travelers)
            __.travelers = __.travelers.filter((e) => e.decline == null);
          return new TripFunderEntity(__);
        }),
      ),
      defaultIfEmpty(undefined),
    );
  };

  /**
   * find traveler trips
   *
   * @param {SortPagin} query query to sort and pagination
   * @param {string} auth user authorization
   *
   * @returns {Observable<TripTravelerEntity[]>}
   */
  findTravelerTrips = (
    query: SortPagin,
    auth: string,
  ): Observable<TripTravelerEntity[]> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.findTravelerTrips(query, userId).pipe(
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
          var t = new TripTravelerEntity(__);
          t.canCancel = __.travelers.some(
            (e) => e.user == userId && e.accept == null && e.decline == null,
          );
          t.accepted = __.travelers.some(
            (e) => e.user == userId && e.accept == true,
          );
          return t;
        }),
      ),
      defaultIfEmpty(undefined),
    );
  };

  /**
   * count traveler trip
   *
   * @param {string} auth user authorization
   *
   * @returns {Observable<number>}
   */
  countTravelerTrips = (auth: string): Observable<number> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.countTravelerTrips(userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      defaultIfEmpty(0),
    );
  };

  /**
   * count trips
   *
   * @returns {Observable<number>}
   */
  count = (): Observable<number> => {
    return this._tripsDao.count().pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      defaultIfEmpty(0),
    );
  };

  /**
   * count user trip
   *
   * @param {string} auth user authorization
   *
   * @returns {Observable<number>}
   */
  countUserTrips = (auth: string): Observable<number> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.countUserTrips(userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      defaultIfEmpty(0),
    );
  };

  /**
   * find all trips
   *
   * @param {TripQuery} query query to search and pagination
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
   * find first tree trips
   *
   *
   * @returns {Observable<TripEntity[]>}
   */
  findFirstTree = (): Observable<TripEntity[]> =>
    this._tripsDao.findFirstTree().pipe(
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
   * find recommanded trip
   *
   * @param {string} id trip id
   *
   * @returns {Observable<TripEntity[]>}
   */
  findRecommendation = (id: string): Observable<TripEntity[]> =>
    this._tripsDao.findRecommendation(id).pipe(
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
   * create trip
   *
   * @param {CreateTripDto} trip trip to create
   * @param {string} filename file name
   * @param {string} auth user authorization
   *
   * @returns {Observable<TripEntity>}
   */
  create = (
    trip: CreateTripDto,
    filename: string,
    auth: string,
  ): Observable<TripEntity> => {
    trip.createdAt = moment().utc().format();
    trip.photo = filename;
    trip.createdBy = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.create(trip).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Trip) => new TripEntity(_)),
    );
  };

  /**
   * update a trip
   *
   * @param {string} id trip id
   * @param {UpdateTripDto} trip trip to update
   * @param {Express.Multer.File} file file to upload
   * @param {string} auth user authorization
   * @returns {Observable<TripEntity>}
   */
  update = (
    id: string,
    trip: UpdateTripDto,
    file: Express.Multer.File,
    auth: string,
  ): Observable<TripEntity> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
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
   * cancel request to join a trip
   *
   * @param {string} id trip id
   * @param {string} auth user authorization
   *
   * @returns {Observable<TripEntity>}
   */
  cancel = (id: string, auth: string): Observable<TripEntity> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.find(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Trip) => {
        if (_.createdBy !== userId) {
          _.travelers = _.travelers.filter((e) => e.user != userId);
          this._tripsDao
            .update(id, new UpdateTripDto(_), _.createdBy)
            .subscribe();
          return !!_
            ? of(undefined)
            : throwError(
                () => new NotFoundException(`Trip with id '${id}' not found`),
              );
        } else {
          return throwError(() => new BadRequestException(`Bad Request`));
        }
      }),
    );
  };

  /**
   * delete a trip
   *
   * @param {string} id of the trip
   * @param {string} auth user authorization
   *
   * @returns {Observable<void>}
   */
  delete = (id: string, auth: string): Observable<void> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
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

  /**
   * request to join a trip
   *
   * @param {string} id trip id
   * @param {string} name name of the traveler
   * @param {string} auth user authorization
   *
   * @returns {Observable<void>}
   */
  demand = (id: string, name: string, auth: string): Observable<void> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.find(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Trip) => {
        if (_.createdBy !== userId) {
          if (_.travelers == undefined) _.travelers = [];
          _.travelers.push(
            new Traveler({
              user: userId,
              name,
              accept: null,
              decline: null,
            }),
          );
          this._tripsDao
            .update(id, new UpdateTripDto(_), _.createdBy)
            .subscribe();
          return !!_
            ? of(undefined)
            : throwError(
                () => new NotFoundException(`Trip with id '${id}' not found`),
              );
        } else {
          return throwError(() => new BadRequestException(`Bad Request`));
        }
      }),
    );
  };

  /**
   * accept a traveler into a trip
   *
   * @param {string} id trip id
   * @param {string} userAccepted traveler id to accept
   * @param {string} auth user authorization
   *
   * @returns {Observable<void>}
   */
  accept = (
    id: string,
    userAccepted: string,
    auth: string,
  ): Observable<void> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.find(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Trip) => {
        if (_.createdBy === userId) {
          var i = _.travelers.findIndex(
            (e) => e.user.toString() === userAccepted,
          );
          _.travelers[i].accept = true;
          this._tripsDao
            .update(id, new UpdateTripDto(_), _.createdBy)
            .subscribe();
          return !!_
            ? of(undefined)
            : throwError(
                () => new NotFoundException(`Trip with id '${id}' not found`),
              );
        } else {
          return throwError(() => new BadRequestException(`Bad Request`));
        }
      }),
    );
  };

  /**
   * decline a traveler to join a trip
   *
   * @param {string} id trip id
   * @param {string} userDeclined traveler id to decline
   * @param {string} auth user authorization
   *
   * @returns {Observable<void>}
   */
  decline = (
    id: string,
    userDeclined: string,
    auth: string,
  ): Observable<void> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._tripsDao.find(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Trip) => {
        if (_.createdBy === userId) {
          var i = _.travelers.findIndex(
            (e) => e.user.toString() === userDeclined,
          );
          _.travelers[i].decline = true;
          this._tripsDao
            .update(id, new UpdateTripDto(_), _.createdBy)
            .subscribe();
          return !!_
            ? of(undefined)
            : throwError(
                () => new NotFoundException(`Trip with id '${id}' not found`),
              );
        } else {
          return throwError(() => new BadRequestException(`Bad Request`));
        }
      }),
    );
  };
}
