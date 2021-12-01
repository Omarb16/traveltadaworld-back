import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class SortPagin {
  @IsString()
  @IsNotEmpty()
  active: string;

  @IsOptional()
  @IsString()
  direction: string;

  @IsString()
  @IsNotEmpty()
  skip: number;

  @IsString()
  @IsNotEmpty()
  limit: number;
}
