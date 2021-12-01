import { JwtService } from '@nestjs/jwt';
import { NotificationEntity } from './entities/notification.entity';
import { Notification } from './notification.shema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { map, mergeMap } from 'rxjs/operators';
import { catchError, Observable, of, throwError } from 'rxjs';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import * as config from 'config';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notifications.dto';
import { NotificationsDao } from './notifications.dao';
const fs = require('fs');

@Injectable()
export class NotificationsService {
  /**
   * Class constructor
   *
   * @param {NotificationsDao} _notificationsDao instance of the DAO
   */
  constructor(
    private readonly _notificationsDao: NotificationsDao,
    private _jwtService: JwtService,
  ) {}

  /**
   * Returns one notification of the list matching id in parameter
   *
   * @param {CreateNotificationDto} notification of the notification
   *
   * @returns {Observable<NotificationEntity>}
   */
  create = (notification: CreateNotificationDto) => {
    return this._notificationsDao.create(notification).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Notification) => {
        return !!_
          ? of(new NotificationEntity(_))
          : throwError(() => new NotFoundException(`Not found`));
      }),
    );
  };

  /**
   * Returns one notification of the list matching id in parameter
   *
   * @param {string} id of the notification
   * @param {UpdateNotificationDto} notification of the notification
   *
   * @returns {Observable<NotificationEntity>}
   */
  update = (
    id: string,
    notification: UpdateNotificationDto,
  ): Observable<NotificationEntity> => {
    notification.seen = true;
    return this._notificationsDao.update(id, notification).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Notification) =>
        !!_
          ? of(new NotificationEntity(_))
          : throwError(() => new NotFoundException(`Not found`)),
      ),
    );
  };

  /**
   * Returns one notification of the list matching id in parameter
   *
   * @param {string} id of the notification
   *
   * @returns {Observable<NotificationEntity>}
   */
  find = (auth: string): Observable<NotificationEntity[]> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._notificationsDao.find(userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Notification[]) =>
        _.map((__: Notification) => {
          return new NotificationEntity(__);
        }),
      ),
    );
  };

  /**
   * Returns one notification of the list matching id in parameter
   *
   * @param {string} id of the notification
   *
   * @returns {Observable<NotificationEntity>}
   */
  delete = (id: string, auth: string): Observable<NotificationEntity> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._notificationsDao.delete(id, userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Notification) => {
        return !!_
          ? of(new NotificationEntity(_))
          : throwError(() => new NotFoundException(`Not found`));
      }),
    );
  };

  /**
   * Returns one notification of the list matching id in parameter
   *
   * @param {string} id of the notification
   *
   * @returns {Observable<NotificationEntity>}
   */
  count = (auth: string): Observable<NotificationEntity> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._notificationsDao.count(userId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Notification) => {
        return !!_
          ? of(new NotificationEntity(_))
          : throwError(() => new NotFoundException(`Not found`));
      }),
    );
  };
}
