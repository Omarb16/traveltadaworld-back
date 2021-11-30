import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { NotificationEntity } from '../entities/notification.entity';

export class CreateNotificationDto {
  @ApiProperty({
    name: 'title',
    description: 'Title',
    example: 'Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description',
    example: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
