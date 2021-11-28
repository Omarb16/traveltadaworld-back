import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto {
  // @ApiProperty({
  //   name: 'photo',
  //   description: 'Photo URL',
  //   example: 'https://randomuser.me/portraits/men/55.jpg',
  // })
  // @IsString()
  // @IsOptional()
  // photo: string;

  @ApiProperty({
    name: 'userId',
    description: 'userId',
    example: 'userId',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

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
    name: 'birthDate',
    description: 'Birthdate in timestamp format',
    example: '101343600000',
  })
  @IsString()
  @IsOptional()
  birthDate: String;

  @ApiProperty({
    name: 'address',
    description: 'Address',
    example: 'Address',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    name: 'city',
    description: 'City',
    example: 'Nancy',
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    name: 'postalCode',
    description: 'Postal code',
    example: '54500',
  })
  @IsString()
  @IsOptional()
  postalCode: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone',
    example: '+33610012222',
  })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @ApiProperty({
    name: 'updatedAt',
    description: 'Updated At',
    example: '',
  })
  updatedAt: String;

  @ApiProperty({
    name: 'updatedBy',
    description: 'Updated By',
    example: '61a24cfcbf197afd4214acae',
  })
  updatedBy: String;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
