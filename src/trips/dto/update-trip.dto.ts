import { TripEntity } from '../entities/trip.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInstance,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DestinationDto } from './destination.dto';

export class UpdateTripDto {
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
  @IsInstance(DestinationDto)
  @ValidateNested()
  @Type(() => DestinationDto)
  destination: string;

  // @ApiProperty({
  //   name: 'photo',
  //   description: 'Photo URL',
  //   example: 'photo',
  // })
  // @IsString()
  // @IsNotEmpty()
  // photo: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created At',
    example: '',
  })
  updatedAt: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a24cfcbf197afd4214acae',
  })
  updatedBy: string;

  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
}
