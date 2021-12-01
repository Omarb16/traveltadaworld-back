import { TripEntity } from '../entities/trip.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Traveler } from '../trip.shema';

export class UpdateTripDto {
  @ApiProperty({
    name: 'title',
    description: 'Titre du voyage',
    example: 'Voyage a Barcelone',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description du voyage',
    example: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    name: 'dateBegin',
    description: 'Date de debut du voyage',
    example: '2020-12-01T00:23:38.000Z',
  })
  @IsString()
  @IsNotEmpty()
  dateBegin: string;

  @ApiProperty({
    name: 'dateEnd',
    description: 'Date de fin du voyage',
    example: '2020-12-01T00:23:38.000Z',
  })
  @IsString()
  @IsNotEmpty()
  dateEnd: string;

  @ApiProperty({
    name: 'city',
    description: 'Ville',
    example: 'Barcelone',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    name: 'country',
    description: 'Pays',
    example: 'Espagne',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    name: 'detail',
    description: 'Detail du voyage',
    example: 'Detail',
  })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty({
    name: 'price',
    description: 'Prix estimé',
    example: '50',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: '',
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    name: 'createdNameBy',
    description: 'Nom du createur',
    example: 'Nom Prenom',
  })
  @IsString()
  @IsNotEmpty()
  createdNameBy: string;

  @ApiProperty({
    name: 'travelers',
    description: 'Voyageurs',
    example: '[]',
  })
  @IsOptional()
  travelers: Traveler[];

  @ApiProperty({
    name: 'updatedAt',
    description: 'Date de modification',
    example: '2020-12-01T00:23:38.000Z',
  })
  @IsString()
  @IsOptional()
  updatedAt: string;

  @ApiProperty({
    name: 'updatedBy',
    description: '',
    example: '61a24cfcbf197afd4214acae',
  })
  @IsString()
  @IsOptional()
  updatedBy: string;

  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
}
