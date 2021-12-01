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

  @IsString()
  @IsOptional()
  dateBegin: string;

  @IsString()
  @IsOptional()
  dateEnd: string;

  @IsString()
  @IsOptional()
  price: string;
}
