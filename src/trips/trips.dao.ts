import { User } from './../users/user.shema';
import { TripQuery } from './../validators/trip-query';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip, TripDocument, Traveler } from './trip.shema';
const ObjectId = require('mongodb').ObjectID;

@Injectable()
export class TripsDao {
  /**
   * Class constructor
   *
   * @param {Model<TripDocument>} _tripModel instance of the model representing a Trip
   */
  constructor(
    @InjectModel(Trip.name)
    private readonly _tripModel: Model<TripDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel or undefined
   *
   * @param {string} id
   *
   * @return {Observable<Trip | void>}
   */
  find = (id: string): Observable<Trip | void> =>
    from(this._tripModel.findById(id)).pipe(
      filter((doc: TripDocument) => !!doc),
      map((doc: TripDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   *
   * @return {Observable<Trip[] | void>}
   */
  findAll = (query: TripQuery): Observable<Trip[] | void> => {
    var search = {};
    if (query.title) search['title'] = { $regex: query.title, $options: 'i' };
    if (query.city) search['city'] = { $regex: query.city, $options: 'i' };
    if (query.price) search['price'] = { $regex: query.price, $options: 'i' };
    if (query.dateBegin) search['dateBegin'] = { $regex: query.dateBegin, $options: 'i' };
    if (query.dateEnd) search['dateEnd'] = { $regex: query.dateEnd, $options: 'i' };
    if (query.country)
      search['country'] = { $regex: query.country, $options: 'i' };
    return from(this._tripModel.find(search).sort({ createdAt: -1 })).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   *
   * @return {Observable<Trip[] | void>}
   */
  findUserTrips = (userId: string): Observable<Trip[]> =>
    from(
      this._tripModel.find({ createdBy: userId }).sort({ createdAt: -1 }),
    ).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   *
   * @return {Observable<Trip[] | void>}
   */
  findTravelerTrips = (userId: string): Observable<Trip[] | void> =>
    from(
      this._tripModel
        .find({
          travelers: {
            $elemMatch: { user: userId, decline: null },
          },
        })
        .sort({ createdAt: -1 }),
    ).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   * @param {TripDto} trip
   *
   * @return {Observable<Trip | void>}
   */
  create = (trip: CreateTripDto): Observable<Trip | void> => {
    return from(this._tripModel.create(trip)).pipe(
      map((doc: TripDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   * @param {string} id
   * @param {TripDto} trip
   *
   * @return {Observable<Trip | void>}
   */
  update = (
    id: string,
    trip: UpdateTripDto,
    userId: string,
  ): Observable<Trip | void> =>
    from(
      this._tripModel.findOneAndUpdate({ _id: id, createdBy: userId }, trip, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: TripDocument) => !!doc),
      map((doc: TripDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   * @param {string} id
   *
   * @return {Observable<void>}
   */
  delete = (id: string, userId: string): Observable<Trip | void> => {
    return from(this._tripModel.findOneAndRemove({ _id: id })).pipe(
      filter((doc: TripDocument) => !!doc),
      map((doc: TripDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };
}
