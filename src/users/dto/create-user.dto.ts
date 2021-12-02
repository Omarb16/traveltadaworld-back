import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'mclaughlin.cochran@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'aaAA12**',
  })
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
  password: string;

  @ApiProperty({
    name: 'repassword',
    description: 'RePassword',
    example: 'aaAA12**',
  })
  @IsString()
  @IsNotEmpty()
  @Match('password')
  repassword: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;

  @ApiProperty({
    name: 'firstname',
    description: 'Firstname',
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
    example: '',
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
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({
    name: 'address',
    description: 'Address',
    example: 'Address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    name: 'city',
    description: 'City',
    example: 'Nancy',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    name: 'country',
    description: 'Country',
    example: 'France',
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({
    name: 'postalCode',
    description: 'Postal code',
    example: '54500',
  })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone',
    example: '+33610012222',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created At',
    example: '2020-12-01T00:23:38.000Z',
  })
  @IsOptional()
  @IsString()
  createdAt: string;

  @ApiProperty({
    name: 'createdBy',
    description: 'Created By',
    example: '61a24cfcbf197afd4214acae',
  })
  @IsOptional()
  @IsString()
  createdBy: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
