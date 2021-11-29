import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DestinationDto {
  @ApiProperty({
    name: 'country',
    description: 'country',
    example: 'country',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ name: 'city', description: 'City', example: 'Snelling' })
  @IsString()
  @IsNotEmpty()
  city: string;
}
