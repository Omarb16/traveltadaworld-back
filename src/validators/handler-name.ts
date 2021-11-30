import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class HandlerName {
  @IsString()
  @IsNotEmpty()
  name: string;
}
