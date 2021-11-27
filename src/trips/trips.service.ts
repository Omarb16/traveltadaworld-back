import { TripEntity } from './entities/trip.entity';
import { TripsDao } from './trips.dao';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
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
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
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
}
