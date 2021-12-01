import { AccessToken } from './entities/access-token.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.shema';
import { UserEntity } from './entities/user.entity';
import { UsersDao } from './users.dao';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import * as config from 'config';
const fs = require('fs');

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
  logIn = (user: LoginUserDto): Observable<AccessToken> => {
    return this._usersDao.logIn(user).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) => {
        var check = bcrypt.compareSync(
          user.password,
          _?.password ? _?.password : '',
        );
        if (!check) {
          return throwError(
            () => new BadRequestException(`Wrong email or password`),
          );
        }
        return !!_
          ? of(
              new AccessToken(
                _,
                this._jwtService.sign({ email: _.email, sub: _._id }),
              ),
            )
          : throwError(() => new NotFoundException(`Wrong email or password`));
      }),
    );
  };

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {CreateUserDto} user of the user
   *
   * @returns {Observable<UserEntity>}
   */
  signIn = (user: CreateUserDto, filename: string) => {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    user.createdAt = moment().utc().format();
    user.photo = filename;
    return this._usersDao.create(user).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `User with email ${user.email} already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) => {
        _.createdBy = _._id;
        this._usersDao.update(_._id, _).subscribe();
        return !!_
          ? of(
              new AccessToken(
                _,
                this._jwtService.sign({ email: _.email, sub: _._id }),
              ),
            )
          : throwError(
              () =>
                new NotFoundException(
                  `User with email ${user.email} not found`,
                ),
            );
      }),
    );
  };

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   * @param {UpdateUserDto} user of the user
   *
   * @returns {Observable<UserEntity>}
   */
  update = (
    id: string,
    user: UpdateUserDto,
    file: Express.Multer.File,
    auth: string,
  ): Observable<UserEntity> => {
    user.updatedAt = moment().utc().format();
    if (file) {
      user.photo = file.filename;
    } else {
      delete user.photo;
    }
    user.updatedBy = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._usersDao.update(id, user).pipe(
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
  };

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<UserEntity>}
   */
  find = (id: string): Observable<UserEntity> => {
    return this._usersDao.find(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) => {
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
          ? of(new UserEntity(_))
          : throwError(
              () => new NotFoundException(`User with id '${id}' not found`),
            );
      }),
    );
  };

  /**
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user
   *
   * @returns {Observable<void>}
   */
  delete = (id: string, auth: string): Observable<void> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._usersDao.delete(id, userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: User) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`User with id '${id}' not found`),
            ),
      ),
    );
  };
}
