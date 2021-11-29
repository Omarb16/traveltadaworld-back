import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DestinationEntity {
  @ApiProperty({
    name: 'country',
    description: 'country',
    example: 'country',
  })
  @Expose()
  country: string;

  @ApiProperty({ name: 'city', description: 'City', example: 'Snelling' })
  @Expose()
  city: string;
}
