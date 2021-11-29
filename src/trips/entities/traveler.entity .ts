import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class TravelerEntity {
  @ApiProperty({
    name: 'travler',
    description: 'travler',
    example: 'travler',
  })
  @Expose()
  @Type(() => String)
  traveler: string;

  @ApiProperty({
    name: 'accept',
    description: 'accept',
    example: 'accept',
  })
  @Expose()
  @Type(() => Boolean)
  accept: boolean;

  @ApiProperty({
    name: 'decline',
    description: 'decline',
    example: 'decline',
  })
  @Expose()
  @Type(() => Boolean)
  decline: boolean;

  constructor(partial: Partial<TravelerEntity>) {
    Object.assign(this, partial);
  }
}
