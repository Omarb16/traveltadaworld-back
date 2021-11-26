import { Injectable } from '@nestjs/common';
import { defaultIfEmpty, filter, map, Observable } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { User } from './user.shema';
import { UsersDao } from './users.dao';

@Injectable()
export class UsersService {
  constructor(private readonly _usersDao: UsersDao) {}

  logIn = () => {};

  signIn = () => {};
}
