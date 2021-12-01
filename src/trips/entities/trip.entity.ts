import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { User } from 'src/users/user.shema';

@Exclude()
export class TripEntity {
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
  @Exclude()
  @Type(() => String)
  createdBy: string;

  @ApiProperty({
    name: 'createdNameBy',
    description: "Nom de l'organisateur",
    example: 'Nom prenom',
  })
  @Expose()
  @Type(() => String)
  createdNameBy: string;

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

  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
}
