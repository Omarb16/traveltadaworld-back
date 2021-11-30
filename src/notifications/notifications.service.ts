import { NotificationEntity } from './entities/notification.entity';
import { Notification } from './notification.shema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
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
  constructor(private readonly _notificationsDao: NotificationsDao) {}

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
    auth: string,
  ): Observable<NotificationEntity> => {
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
  find = (id: string): Observable<NotificationEntity> => {
    return this._notificationsDao.find(id).pipe(
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
  delete = (id: string): Observable<NotificationEntity> => {
    return this._notificationsDao.find(id).pipe(
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
