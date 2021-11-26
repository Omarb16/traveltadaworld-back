import { UsersService } from './users.service';
import {
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
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns user id',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post()
  signIn() {
    return this._usersService.signIn();
  }

  /**
   * Handler to answer in to POST /users/logIn route
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns user id',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post()
  logIn() {
    return this._usersService.logIn();
  }

  /**
   * Handler to answer in to POST /users route
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Update an user',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Put()
  update() {
    return this._usersService.update();
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
  find(@Param() params: HandlerParams) {
    return this._usersService.find(params.id);
  }
}
