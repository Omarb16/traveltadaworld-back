import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.shema';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsDao {
  /**
   * Class constructor
   *
   * @param {Model<NotificationDocument>} _notificationModel instance of the model representing a Notification
   */
  constructor(
    @InjectModel(Notification.name)
    private readonly _notificationModel: Model<NotificationDocument>,
  ) {}

  /**
   * Create a notification in notifications list
   *
   * @param {NotificationDto} notification
   *
   * @return {Observable<Notification | void>}
   */
  create = (notification: NotificationDto): Observable<Notification | void> => {
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
   * @param {NotificationDto} notification
   *
   * @return {Observable<Notification | void>}
   */
  update = (
    id: string,
    notification: NotificationDto,
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
   * Get user notifications
   *
   * @param {string} userId
   *
   * @return {Observable<Notification[] | void>}
   */
  find = (userId: string): Observable<Notification[] | void> =>
    from(this._notificationModel.find({ userId }).sort({ createdAt: -1 })).pipe(
      filter((docs: NotificationDocument[]) => !!docs && docs.length > 0),
      map((docs: NotificationDocument[]) =>
        docs.map((_: NotificationDocument) => _.toJSON()),
      ),
      defaultIfEmpty([]),
    );

  /**
   * Delete a notification
   *
   * @param {string} id
   * @param {string} userId
   *
   * @return {Observable<void>}
   */
  delete = (id: string, userId: string): Observable<void> => {
    return from(
      this._notificationModel.findOneAndRemove({ _id: id, userId }),
    ).pipe(
      filter((doc: NotificationDocument) => !!doc),
      map((doc: NotificationDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };

  /**
   * Count user notification
   *
   * @param {string} userId
   *
   * @return {Observable<Number>}
   */
  count = (userId: string): Observable<Number> => {
    return from(this._notificationModel.count({ userId, seen: false })).pipe(
      defaultIfEmpty(undefined),
    );
  };
}
