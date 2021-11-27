import { LoginUserDto } from './dto/login-user.dto copy';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { UserEntity } from './entities/user.entity';
import { HandlerParams } from 'src/validators/handler-params';
import { Observable } from 'rxjs';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class UsersController {
  /**
   * Class constructor
   * @param _peopleService
   */
  constructor(private readonly _usersService: UsersService) {}

  /**
   * Handler to answer in to POST /users/signIn route
   *
   * @param {CreateUserDto} createUserDto data to create
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns user id',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post('signIn')
  signIn(@Body() createUserDto: CreateUserDto) {
    return this._usersService.signIn(createUserDto);
  }

  /**
   * Handler to answer in to POST /users/logIn route
   *
   * @param {LoginUserDto} loginUserDto data to login
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns user id',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post('logIn')
  logIn(@Body() loginUserDto: LoginUserDto) {
    return this._usersService.logIn(loginUserDto);
  }

  /**
   * Handler to answer in to POST /users route
   *
   * @param {HandlerParams} params list of route params to take person id
   * @param {UpdateUserDto} updatePersonDto data to update
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Update an user',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updatePersonDto: UpdateUserDto,
  ): Observable<UserEntity> {
    return this._usersService.update(params.id, updatePersonDto);
  }

  /**
   * Handler to answer in to POST /users/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return an user',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  find(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._usersService.find(params.id);
  }
}
