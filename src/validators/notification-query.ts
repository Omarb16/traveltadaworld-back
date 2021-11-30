import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationQuery {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

}
