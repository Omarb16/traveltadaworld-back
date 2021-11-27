import { TripDto } from './dto/trip.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  findAll = (): Observable<Trip[] | void> =>
    from(this._tripModel.find()).pipe(
      filter((docs: TripDocument[]) => !!docs && docs.length > 0),
      map((docs: TripDocument[]) => docs.map((_: TripDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   * @param {TripDto} trip
   *
   * @return {Observable<Trip | void>}
   */
  create = (trip: TripDto): Observable<Trip | void> =>
    from(this._tripModel.create(trip)).pipe(
      map((doc: TripDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns TripModel[] or undefined
   *
   * @param {string} id
   * @param {TripDto} trip
   *
   * @return {Observable<Trip | void>}
   */
  update = (id: string, trip: TripDto): Observable<Trip> =>
    from(
      this._tripModel.findByIdAndUpdate(id, trip, {
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
  delete = (id: string): Observable<Trip | void> =>
    from(this._tripModel.findByIdAndRemove(id)).pipe(
      filter((doc: TripDocument) => !!doc),
      map((doc: TripDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
