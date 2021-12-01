import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SortPagin {
  @IsString()
  @IsNotEmpty()
  active: string;

  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsNumber()
  @IsNotEmpty()
  skip: number;

  @IsNumber()
  @IsNotEmpty()
  take: number;
}
