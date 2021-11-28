import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { UserEntity } from './user.entity';

@Exclude()
export class AccessToken {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'access_token',
    description: 'Access Token',
    example: '',
  })
  @Expose()
  @Type(() => String)
  access_token: string;

  @ApiProperty({
    name: 'fistname',
    description: 'Fistname',
    example: 'Mclaughlin',
  })
  @Expose()
  @Type(() => String)
  firstname: string;

  @ApiProperty({
    name: 'lastname',
    description: 'Lastname',
    example: 'Mclaughlin',
  })
  @Expose()
  @Type(() => String)
  lastname: String;

  constructor(partial: Partial<UserEntity>, access_token: string) {
    Object.assign(this, partial);
    this.access_token = access_token;
  }
}
