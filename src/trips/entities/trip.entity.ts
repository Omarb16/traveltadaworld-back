import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { DestinationEntity } from './destination.entity';

@Exclude()
export class TripEntity {
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
    name: 'destination',
    description: 'Destination',
    example: 'Destination',
  })
  @Expose()
  @Type(() => DestinationEntity)
  destination: DestinationEntity;

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: 'https://randomuser.me/portraits/men/55.jpg',
  })
  @Expose()
  @Type(() => String)
  photo: string;

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

  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
}
