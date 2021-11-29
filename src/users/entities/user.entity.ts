import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

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
  lastname: string;

  @ApiProperty({
    name: 'description',
    description: 'Description',
    example: 'Description',
  })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: '',
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
  birthDate: string;

  @ApiProperty({
    name: 'address',
    description: 'Address',
    example: 'Address',
  })
  @Expose()
  @Type(() => String)
  address: string;

  @ApiProperty({
    name: 'city',
    description: 'City',
    example: 'Nancy',
  })
  @Expose()
  @Type(() => String)
  city: string;

  @ApiProperty({
    name: 'country',
    description: 'Country',
    example: 'France',
  })
  @Expose()
  @Type(() => String)
  country: string;

  @ApiProperty({
    name: 'postalCode',
    description: 'Postal code',
    example: '54500',
  })
  @Expose()
  @Type(() => String)
  postalCode: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone',
    example: '+33610012222',
  })
  @Expose()
  @Type(() => String)
  phone: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created At',
    example: '2021-11-27T13:41:48.229Z',
  })
  @Exclude()
  @Type(() => Date)
  createdAt: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a1885b50cf46588632569a',
  })
  @Exclude()
  @Type(() => String)
  createdBy: string;

  @ApiProperty({
    name: 'updatedAt',
    description: 'Updated At',
    example: '2021-11-27T13:41:48.229Z',
  })
  @Exclude()
  @Type(() => Date)
  updatedAt: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a1885b50cf46588632569a',
  })
  @Exclude()
  @Type(() => String)
  updatedBy: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
