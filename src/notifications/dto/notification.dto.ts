import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { NotificationEntity } from '../entities/notification.entity';

export class NotificationDto {
  @ApiProperty({
    name: 'title',
    description: 'Titre de la notification',
    example: 'Demande annulée',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'content',
    description: 'Contenu de la notification',
    example: 'Nom Prenom a annulée sa demande',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    name: 'seen',
    description: 'Notification vu ou pas',
    example: 'false',
  })
  @IsBoolean()
  @IsNotEmpty()
  seen: boolean;

  @ApiProperty({
    name: 'userId',
    description: "Identifiant de l'utilsateur qui recoit la notification",
    example: '61a532ddbf07326c95b10906',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Date de creation de la notification',
    example: '2020-12-01T00:23:38.000Z',
  })
  createdAt: string;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
