import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Exclude()
  @Type(() => String)
  _id: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'Mclaughlin.Cochran@undefined.com',
  })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'aaAA12**',
  })
  @Exclude()
  @Type(() => String)
  password: string;

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

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: 'https://randomuser.me/portraits/men/55.jpg',
  })
  @Expose()
  @Type(() => String)
  photo: string;

  @ApiProperty({
    name: 'birthDate',
    description: 'Birthdate in timestamp format',
    example: '101343600000',
  })
  @Expose()
  @Type(() => String)
  birthDate: String;

  @ApiProperty({
    name: 'nationality',
    description: 'Nationality',
    example: 'French',
  })
  @Expose()
  @Type(() => String)
  nationality: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created At',
    example: '2021-11-27T13:41:48.229Z',
  })
  @Exclude()
  @Type(() => Date)
  createdAt: String;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a1885b50cf46588632569a',
  })
  @Exclude()
  @Type(() => String)
  createdBy: String;

  @ApiProperty({
    name: 'updatedAt',
    description: 'Updated At',
    example: '2021-11-27T13:41:48.229Z',
  })
  @Exclude()
  @Type(() => Date)
  updatedAt: String;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a1885b50cf46588632569a',
  })
  @Exclude()
  @Type(() => String)
  updatedBy: String;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
