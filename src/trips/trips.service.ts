import { TripDto } from './dto/trip.dto';
import { TripEntity } from './entities/trip.entity';
import { TripsDao } from './trips.dao';
import {
  ConflictException,
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

@Injectable()
export class TripsService {
  /**
   * Class constructor
   *
   * @param {TripsDao} _tripsDao instance of the DAO
   */
  constructor(private readonly _tripsDao: TripsDao) {}

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
      mergeMap((_: Trip) =>
        !!_
          ? of(new TripEntity(_))
          : throwError(
              () => new NotFoundException(`Trip with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Returns one trip of the list matching id in parameter
   *
   *
   * @returns {Observable<TripEntity[]>}
   */
  findAll = (): Observable<TripEntity[]> =>
    this._tripsDao.findAll().pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Trip[]) => _.map((__: Trip) => new TripEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one trip of the list matching id in parameter
   *
   * @param {TripDto} trip of the trip
   *
   * @returns {Observable<TripEntity>}
   */
  create = (trip: TripDto): Observable<TripEntity> =>
    this._tripsDao.create(trip).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Trip) => new TripEntity(_)),
    );

  /**
   * Returns one trip of the list matching id in parameter
   *
   * @param {string} id of the trip
   * @param {TripDto} trip of the trip
   *
   * @returns {Observable<TripEntity>}
   */
  update = (id: string, trip: TripDto): Observable<TripEntity> =>
    this._tripsDao.update(id, trip).pipe(
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

  /**
   * Returns one trip of the list matching id in parameter
   *
   * @param {string} id of the trip
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._tripsDao.delete(id).pipe(
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
}
