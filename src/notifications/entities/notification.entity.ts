import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class NotificationEntity {
  @ApiProperty({
    name: 'id',
    description: 'Identifiant unique',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'title',
    description: 'Titre de la notification',
    example: 'Demande annulée',
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    name: 'content',
    description: 'Contenu de la notification',
    example: 'Nom Prenom a annulée sa demande',
  })
  @Expose()
  @Type(() => String)
  content: string;

  @ApiProperty({
    name: 'seen',
    description: 'Notification vu ou pas',
    example: 'false',
  })
  @Expose()
  @Type(() => Boolean)
  seen: boolean;

  @ApiProperty({
    name: 'userId',
    description: "Identifiant de l'utilsateur qui recoit la notification",
    example: '61a532ddbf07326c95b10906',
  })
  @Expose()
  @Type(() => String)
  userId: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Date de creation de la notification',
    example: '2020-12-01T00:23:38.000Z',
  })
  @Expose()
  @Type(() => String)
  createdAt: string;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
