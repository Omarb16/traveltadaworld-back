import { Exclude } from 'class-transformer';

@Exclude()
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
