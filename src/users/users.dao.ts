import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.shema';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class UsersDao {
  constructor(
    /**
     * Class constructor
     *
     * @param {Model<UserDocument>} _userModel instance of the model representing an User
     */
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns PersonModel[] or undefined
   *
   * @return {Observable<User | void>}
   */
  find = (id: string): Observable<User | void> =>
    from(this._userModel.findById(id)).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
