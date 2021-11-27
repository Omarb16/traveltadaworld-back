import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({
    name: 'fistname',
    description: 'Fistname',
    example: 'Mclaughlin',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    name: 'lastname',
    description: 'Lastname',
    example: 'Mclaughlin',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    name: 'photo',
    description: 'Photo URL',
    example: 'https://randomuser.me/portraits/men/55.jpg',
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    name: 'birthDate',
    description: 'Birthdate in timestamp format',
    example: '101343600000',
  })
  @IsString()
  @IsOptional()
  birthDate: String;

  @ApiProperty({
    name: 'nationality',
    description: 'Nationality',
    example: 'French',
  })
  @IsString()
  @IsOptional()
  nationality: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
