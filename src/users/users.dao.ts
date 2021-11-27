import { LoginUserDto } from './dto/login-user.dto copy';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
   * Update a person in people list
   *
   * @param {LoginUserDto} user
   *
   * @return {Observable<User | void>}
   */
  logIn = (user: LoginUserDto): Observable<User | void> =>
    from(
      this._userModel.findOne({ email: user.email, password: user.password }),
    ).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Update a person in people list
   *
   * @param {CreateUserDto} user
   *
   * @return {Observable<User | void>}
   */
  create = (user: CreateUserDto): Observable<User | void> =>
    from(this._userModel.create(user)).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Update a user in people list
   *
   * @param {string} id
   * @param {UpdateUserDto} user
   *
   * @return {Observable<User | void>}
   */
  update = (id: string, user: UpdateUserDto): Observable<User | void> =>
    from(
      this._userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Call mongoose method, call toJSON on each result and returns PersonModel[] or undefined
   *
   * @param {string} id
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
