import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

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
    description: 'title',
    example: 'title',
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @Expose()
  @Type(() => String)
  content: string;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @Expose()
  @Type(() => Boolean)
  seen: boolean;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @Expose()
  @Type(() => String)
  userId: string;

  @ApiProperty({
    name: 'title',
    description: 'title',
    example: 'title',
  })
  @Expose()
  @Type(() => String)
  createdAt: string;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
