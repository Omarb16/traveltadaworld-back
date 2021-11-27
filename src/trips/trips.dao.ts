import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Trip, TripDocument } from './trip.shema';

@Injectable()
export class TripsDao {
  constructor(
    /**
     * Class constructor
     *
     * @param {Model<TripDocument>} _tripModel instance of the model representing a Trip
     */
    @InjectModel(Trip.name)
    private readonly _tripModel: Model<TripDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns PersonModel[] or undefined
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

  findAll = () => {};
  update = () => {};
  delete = () => {};
}
