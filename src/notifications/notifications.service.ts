import { JwtService } from '@nestjs/jwt';
import { NotificationEntity } from './entities/notification.entity';
import { Notification } from './notification.shema';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { map, mergeMap } from 'rxjs/operators';
import { catchError, Observable, of, throwError } from 'rxjs';
import { NotificationDto } from './dto/notification.dto';
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
   * create notification
   *
   * @param {NotificationDto} notification data to create
   *
   * @returns {Observable<NotificationEntity>}
   */
  create = (notification: NotificationDto) => {
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
   * Update notification to seen
   *
   * @param {string} id notification id
   * @param {NotificationDto} notification data to update
   *
   * @returns {Observable<NotificationEntity>}
   */
  update = (
    id: string,
    notification: NotificationDto,
  ): Observable<NotificationEntity> => {
    notification.seen = true;
    console.log(notification);
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
   * Get user notifications
   *
   * @param {string} auth user authorization
   *
   * @returns {Observable<NotificationEntity[]>}
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
   * Delete notification
   *
   * @param {string} id notifiaction id
   * @param {string} auth user notification
   *
   * @returns {Observable<void>}
   */
  delete = (id: string, auth: string): Observable<void> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._notificationsDao
      .delete(id, userId)
      .pipe(
        catchError((e) =>
          throwError(() => new UnprocessableEntityException(e.message)),
        ),
      );
  };

  /**
   * Count user notification
   *
   * @param {string} auth user authorization
   *
   * @returns {Observable<Number>}
   */
  count = (auth: string): Observable<Number> => {
    const userId = this._jwtService.decode(auth.replace('Bearer ', '')).sub;
    return this._notificationsDao
      .count(userId)
      .pipe(
        catchError((e) =>
          throwError(() => new UnprocessableEntityException(e.message)),
        ),
      );
  };
}
