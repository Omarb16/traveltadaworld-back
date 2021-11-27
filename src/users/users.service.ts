import { AccessToken } from './entities/access-token.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.shema';
import { UserEntity } from './entities/user.entity';
import { UsersDao } from './users.dao';

@Injectable()
export class UsersService {
  /**
   * Class constructor
   *
   * @param {UsersDao} _usersDao instance of the DAO
   */
  constructor(
    private readonly _usersDao: UsersDao,
    private readonly _jwtService: JwtService,
  ) {}

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {LoginUserDto} user of the user
   *
   * @returns {Observable<AccessToken>}
   */
  logIn = (user: LoginUserDto): Observable<AccessToken> =>
    this._usersDao.logIn(user).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(
              new AccessToken(
                this._jwtService.sign({ email: _.email, sub: _._id }),
              ),
            )
          : throwError(() => new NotFoundException(`Wrong email or password`)),
      ),
    );

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {CreateUserDto} user of the user
   *
   * @returns {Observable<UserEntity>}
   */
  signIn = (user: CreateUserDto) =>
    this._usersDao.create(user).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `User with email '${user.email} already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(
              new AccessToken(
                this._jwtService.sign({ email: _.email, sub: _._id }),
              ),
            )
          : throwError(
              () =>
                new NotFoundException(`User with id '${_.email}' not found`),
            ),
      ),
    );

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   * @param {UpdateUserDto} user of the user
   *
   * @returns {Observable<UserEntity>}
   */
  update = (id: string, user: UpdateUserDto): Observable<UserEntity> =>
    this._usersDao.update(id, user).pipe(
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
