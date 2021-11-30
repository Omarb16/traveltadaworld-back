import { TripEntity } from '../entities/trip.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInstance,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/users/user.shema';

export class CreateTripDto {
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
    name: 'city',
    description: 'city',
    example: 'city',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    name: 'country',
    description: 'country',
    example: 'country',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: '',
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created At',
    example: '',
  })
  @IsString()
  @IsOptional()
  createdAt: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a24cfcbf197afd4214acae',
  })
  @IsString()
  @IsOptional()
  createdBy: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a24cfcbf197afd4214acae',
  })
  @IsString()
  @IsNotEmpty()
  createdNameBy: string;

  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
}
