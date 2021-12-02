import { LoginUserDto } from './dto/login-user.dto copy';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.shema';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UsersDao {
  /**
   * Class constructor
   *
   * @param {Model<UserDocument>} _userModel instance of the model representing an User
   */
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  /**
   * Log in an user
   *
   * @param {LoginUserDto} user user to log in
   *
   * @return {Observable<User | void>}
   */
  logIn = (user: LoginUserDto): Observable<User | void> =>
    from(this._userModel.findOne({ email: user.email })).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * SignIn an user
   *
   * @param {CreateUserDto} user user to sign in
   *
   * @return {Observable<User | void>}
   */
  create = (user: CreateUserDto): Observable<User | void> => {
    const userModel = new this._userModel(user);
    return from(userModel.save()).pipe(
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };
  /**
   * Update an user
   *
   * @param {string} id user id
   * @param {UpdateUserDto} user user to update
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
   * find a user
   *
   * @param {string} id user id
   *
   * @return {Observable<User | void>}
   */
  find = (id: string): Observable<User | void> =>
    from(this._userModel.findById(id)).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * delete an user
   *
   * @param {string} id
   *
   * @return {Observable<User | void>}
   */
  delete = (id: string, userId: string): Observable<User | void> => {
    return from(
      this._userModel.findOneAndRemove({ _id: id, createdBy: userId }),
    ).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  };
}
