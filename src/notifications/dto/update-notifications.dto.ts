import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { NotificationEntity } from '../entities/notification.entity';

export class UpdateNotificationDto {
  @ApiProperty({
    name: 'id',
    description: 'id',
    example: 'id',
  })
  @IsOptional()
  id: string;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @IsBoolean()
  @IsNotEmpty()
  seen: boolean;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
