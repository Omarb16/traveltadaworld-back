import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { UserEntity } from './entities/user.entity';
import { User } from './user.shema';
import { UsersDao } from './users.dao';

@Injectable()
export class UsersService {
  /**
   * Class constructor
   *
   * @param {UsersDao} _usersDao instance of the DAO
   */
  constructor(private readonly _usersDao: UsersDao) {}

  logIn = () => {};

  signIn = () => {};

  update = () => {};

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
   */
  find = (id: string): Observable<UserEntity> =>
    this._usersDao.find(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(new UserEntity(_))
          : throwError(
              () => new NotFoundException(`User with id '${id}' not found`),
            ),
      ),
    );
}
