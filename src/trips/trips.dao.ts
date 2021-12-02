import { SortPagin } from './../validators/sort-pagin';
import { TripQuery } from './../validators/trip-query';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip, TripDocument } from './trip.shema';

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
   * find trip by id
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
   * find alla trips
   *
   * @param {TripQuery} query search query
   *
   * @return {Observable<Trip[] | void>}
   */
  findAll = (query: TripQuery): Observable<Trip[] | void> => {
    var search = {};
    console.log(query);
    if (query.title) search['title'] = { $regex: query.title, $options: 'i' };
    if (query.city) search['city'] = { $regex: query.city, $options: 'i' };
    if (query.pricemin && query.pricemax)
      search['price'] = { $gte: +query.pricemin, $lte: +query.pricemax };
    else if (query.pricemax) search['price'] = { $lte: +query.pricemax };
    else if (query.pricemin) search['price'] = { $gte: +query.pricemin };
    if (query.dateBegin)
      search['dateBegin'] = { $gte: new Date(query.dateBegin).toISOString() };
    if (query.dateEnd)
      search['dateEnd'] = { $lte: new Date(query.dateEnd).toISOString() };
    if (query.country)
      search['country'] = { $regex: query.country, $options: 'i' };
    console.log(search);
    return from(
      this._tripModel
        .find(search)
        .sort({ createdAt: -1 })
        .skip(+query.skip)
        .limit(+query.limit),
    ).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * find first tree trips
   *
   * @param {string} id trip id
   *
   * @return {Observable<Trip[] | void>}
   */
  findFirstTree = (): Observable<Trip[] | void> => {
    return from(this._tripModel.find().sort({ createdAt: -1 }).limit(3)).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * find trip to recommand
   *
   *
   * @return {Observable<Trip[] | void>}
   */
  findRecommendation = (id: string): Observable<Trip[] | void> => {
    return from(
      this._tripModel
        .find({ _id: { $ne: id } })
        .sort({ createdAt: -1 })
        .limit(3),
    ).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * count user trips
   *
   * @param {string} userId user id
   *
   * @return {Observable<number>}
   */
  countUserTrips = (userId: string): Observable<number> =>
    from(this._tripModel.count({ createdBy: userId })).pipe(
      defaultIfEmpty(undefined),
    );

  count = (): Observable<number> =>
    from(this._tripModel.count()).pipe(defaultIfEmpty(undefined));

  /**
   * count travelers trips
   *
   * @param {string} userId user id
   *
   * @return {Observable<number}
   */
  countTravelerTrips = (userId: string): Observable<number> =>
    from(
      this._tripModel.count({
        travelers: {
          $elemMatch: { user: userId, decline: null },
        },
      }),
    ).pipe(defaultIfEmpty(undefined));

  /**
   * find traveler trips
   *
   * @param {SortPagin} query search query
   * @param {string} userId user id
   *
   * @return {Observable<Trip[] | void>}
   */
  findTravelerTrips = (
    query: SortPagin,
    userId: string,
  ): Observable<Trip[] | void> => {
    var sort = {};
    sort[query.active] = query.direction == 'asc' ? 1 : -1;
    return from(
      this._tripModel
        .find({
          travelers: {
            $elemMatch: { user: userId, decline: null },
          },
        })
        .sort(sort)
        .skip(query.skip)
        .limit(query.limit),
    ).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * find user trips
   *
   * @param {SortPagin} query search query
   * @param {string} userId user id
   *
   *
   * @return {Observable<Trip[]>}
   */
  findUserTrips = (query: SortPagin, userId: string): Observable<Trip[]> => {
    var sort = {};
    sort[query.active] = query.direction == 'asc' ? 1 : -1;
    return from(
      this._tripModel
        .find({ createdBy: userId })
        .sort(sort)
        .skip(+query.skip)
        .limit(+query.limit),
    ).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * create a trip
   *
   * @param {CreateTripDto} trip
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
   * update a trip
   *
   * @param {string} id trip id
   * @param {UpdateTripDto} trip trip to update
   * @param {string} user user id
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
   * delete a trip
   *
   * @param {string} id trip id
   *
   * @param {string} userId user id
   *
   * @return {Observable<void>}
   */
  delete = (id: string, userId: string): Observable<Trip | void> => {
    return from(
      this._tripModel.findOneAndRemove({ _id: id, createdBy: userId }),
    ).pipe(
      filter((doc: TripDocument) => !!doc),
      map((doc: TripDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };
}
