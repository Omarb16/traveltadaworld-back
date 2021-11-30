import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.shema';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notifications.dto';

@Injectable()
export class NotificationsDao {
  /**
   * Class constructor
   *
   * @param {Model<NotificationDocument>} _notificationModel instance of the model representing an Notification
   */
  constructor(
    @InjectModel(Notification.name)
    private readonly _notificationModel: Model<NotificationDocument>,
  ) {}

  /**
   * Create a notification in notifications list
   *
   * @param {CreateNotificationDto} notification
   *
   * @return {Observable<Notification | void>}
   */
  create = (
    notification: CreateNotificationDto,
  ): Observable<Notification | void> => {
    const notificationModel = new this._notificationModel(notification);
    return from(notificationModel.save()).pipe(
      map((doc: NotificationDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };
  /**
   * Update a notification in notifications list
   *
   * @param {string} id
   * @param {UpdateNotificationDto} notification
   *
   * @return {Observable<Notification | void>}
   */
  update = (
    id: string,
    notification: UpdateNotificationDto,
  ): Observable<Notification | void> =>
    from(
      this._notificationModel.findByIdAndUpdate(id, notification, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: NotificationDocument) => !!doc),
      map((doc: NotificationDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns NotificationModel or undefined
   *
   * @param {string} id
   *
   * @return {Observable<Notification | void>}
   */
  find = (id: string): Observable<Notification | void> =>
    from(this._notificationModel.findById(id)).pipe(
      filter((doc: NotificationDocument) => !!doc),
      map((doc: NotificationDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   * @param {string} id
   *
   * @return {Observable<void>}
   */
  delete = (id: string, userId: string): Observable<Notification | void> => {
    return from(this._notificationModel.findOneAndRemove({ _id: id })).pipe(
      filter((doc: NotificationDocument) => !!doc),
      map((doc: NotificationDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };
}
