import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

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
  @Type(() => String)
  destination: string;

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: 'https://randomuser.me/portraits/men/55.jpg',
  })
  @Expose()
  @Type(() => String)
  photo: string;

  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
}
