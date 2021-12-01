import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class TravelerEntity {
  @ApiProperty({
    name: 'user',
    description: 'voyageur',
    example: '61a24cfcbf197afd4214acae',
  })
  @Expose()
  @Type(() => String)
  user: string;

  @ApiProperty({
    name: 'name',
    description: 'Nom du voyageur',
    example: 'Nom prenom',
  })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({
    name: 'accept',
    description: 'Demande accepter',
    example: 'true',
  })
  @Expose()
  @Type(() => Boolean)
  accept?: boolean;

  @ApiProperty({
    name: 'decline',
    description: 'Demande refuser',
    example: 'true',
  })
  @Expose()
  @Type(() => Boolean)
  decline?: boolean;

  constructor(partial: Partial<TravelerEntity>) {
    Object.assign(this, partial);
  }
}
