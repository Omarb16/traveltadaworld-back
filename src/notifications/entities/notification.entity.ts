import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class NotificationEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'title',
    description: 'Title',
    example: 'Title',
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description',
    example: 'Description',
  })
  @Expose()
  @Type(() => String)
  description: string;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
