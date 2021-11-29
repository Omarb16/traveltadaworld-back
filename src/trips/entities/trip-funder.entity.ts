import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class TripFunderEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'title',
    description: 'Title',
    example: 'Title',
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description',
    example: 'Description',
  })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiProperty({
    name: 'city',
    description: 'city',
    example: 'city',
  })
  @Expose()
  @Type(() => String)
  city: string;

  @ApiProperty({
    name: 'travelers',
    description: 'Travelers',
    example: 'travelers',
  })
  @Expose()
  @Type(() => String)
  travelers: string[];

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: '',
  })
  @Expose()
  @Type(() => String)
  photo: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created At',
    example: '2021-11-27T13:41:48.229Z',
  })
  @Expose()
  @Type(() => Date)
  createdAt: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a1885b50cf46588632569a',
  })
  @Expose()
  @Type(() => String)
  createdBy: string;

  constructor(partial: Partial<TripFunderEntity>) {
    Object.assign(this, partial);
  }
}
