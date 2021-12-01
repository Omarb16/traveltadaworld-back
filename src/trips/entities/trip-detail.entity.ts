import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { Traveler } from '../trip.shema';

@Exclude()
export class TripDetailEntity {
  @ApiProperty({
    name: 'id',
    description: 'Identifiant',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'title',
    description: 'Titre du voyage',
    example: 'Voyage a Barcelone',
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description du voyage',
    example: 'Description',
  })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiProperty({
    name: 'travelers',
    description: 'Voyageurs',
    example: '[]',
  })
  @Expose()
  @Type(() => Traveler)
  travelers: Traveler[] = [];

  @ApiProperty({
    name: 'canDemand',
    description: 'Demander de participer au voyage',
    example: 'true',
  })
  @Expose()
  @Type(() => Boolean)
  canDemand: boolean;

  @ApiProperty({
    name: 'canCancel',
    description: 'Annuler la demande',
    example: 'false',
  })
  @Expose()
  @Type(() => Boolean)
  canCancel: boolean;

  @ApiProperty({
    name: 'city',
    description: 'Ville',
    example: 'Barcelone',
  })
  @Expose()
  @Type(() => String)
  city: string;

  @ApiProperty({
    name: 'country',
    description: 'Pays',
    example: 'Espagne',
  })
  @Expose()
  @Type(() => String)
  country: string;

  @ApiProperty({
    name: 'dateBegin',
    description: 'Date de debut du voyage',
    example: '2020-12-01T00:23:38.000Z',
  })
  @Expose()
  @Type(() => String)
  dateBegin: string;

  @ApiProperty({
    name: 'dateEnd',
    description: 'Date de fin du voyage',
    example: '2020-12-01T00:23:38.000Z',
  })
  @Expose()
  @Type(() => String)
  dateEnd: string;

  @ApiProperty({
    name: 'price',
    description: 'Prix estimé',
    example: '50',
  })
  @Expose()
  @Type(() => Number)
  price: string;

  @ApiProperty({
    name: 'detail',
    description: 'Detail du voyage',
    example: 'Detail',
  })
  @Expose()
  @Type(() => String)
  detail: string;

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
    description: 'Date de creation du voyage',
    example: '2020-12-01T00:23:38.000Z',
  })
  @Exclude()
  @Type(() => Date)
  createdAt: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Createur du voyage',
    example: '61a24cfcbf197afd4214acae',
  })
  @Expose()
  @Type(() => String)
  createdBy: string;

  constructor(partial: Partial<TripDetailEntity>) {
    Object.assign(this, partial);
  }
}
