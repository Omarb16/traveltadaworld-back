import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TripQuery {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;
}
