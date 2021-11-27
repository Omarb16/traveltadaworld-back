import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AccessToken {
  @ApiProperty({
    name: 'access_token',
    description: 'Access Token',
    example: '',
  })
  @Expose()
  @Type(() => String)
  access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
