import { TripEntity } from './../entities/trip.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TripDto {
  @ApiProperty({
    name: 'title',
    description: 'Title',
    example: 'Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description',
    example: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    name: 'destination',
    description: 'destination',
    example: 'Destination',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: 'photo',
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
}
