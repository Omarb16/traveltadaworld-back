import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { User } from 'src/users/user.shema';
import * as mongoose from 'mongoose';

@Exclude()
export class TravelerEntity {
  @ApiProperty({
    name: 'travler',
    description: 'travler',
    example: 'travler',
  })
  @Expose()
  @Type(() => String)
  user: string;

  @ApiProperty({
    name: 'travler',
    description: 'travler',
    example: 'travler',
  })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    name: 'accept',
    description: 'accept',
    example: 'accept',
  })
  @Expose()
  @Type(() => Boolean)
  accept?: boolean;

  @ApiProperty({
    name: 'decline',
    description: 'decline',
    example: 'decline',
  })
  @Expose()
  @Type(() => Boolean)
  decline?: boolean;

  constructor(partial: Partial<TravelerEntity>) {
    Object.assign(this, partial);
  }
}
