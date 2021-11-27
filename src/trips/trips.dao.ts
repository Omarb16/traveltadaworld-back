import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Trip, TripDocument } from './entities/trip.entity';

@Injectable()
export class TripsDao {
  constructor(
    /**
     * Class constructor
     *
     * @param {Model<TripDocument>} _tripModel instance of the model representing an User
     */
    @InjectModel(Trip.name)
    private readonly _tripModel: Model<TripDocument>,
  ) {}

  findAll = () => {};
  find = () => {};
  update = () => {};
  delete = () => {};
}
