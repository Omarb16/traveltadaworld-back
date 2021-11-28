import { LoginUserDto } from './dto/login-user.dto copy';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  Body,
  UploadedFile,
  Logger,
  Headers,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { UserEntity } from './entities/user.entity';
import { HandlerParams } from 'src/validators/handler-params';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@ApiConsumes('application/json')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class UsersController {
  /**
   * Class constructor
   * @param _usersService
   */
  constructor(private readonly _usersService: UsersService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('document', {
      dest: './uploads',
    }),
  )
  uploadDocument(@UploadedFile() file) {
    Logger.log('---------------------' + file.name);
  }

  /**
   * Handler to answer in to POST /users/signIn route
   *
   * @param {CreateUserDto} createUserDto data to create
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns user access token',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post('signIn')
  signIn(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') auth: string,
  ) {
    return this._usersService.signIn(createUserDto, auth);
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
   * @param {HandlerParams} params list of route params to take user id
   * @param {UpdateUserDto} updateUserDto data to update
   *
   * @returns Observable<UserEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Update an user',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('authorization') auth: string,
  ): Observable<UserEntity> {
    return this._usersService.update(params.id, updateUserDto, auth);
  }

  /**
   * Handler to answer in to POST /users/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
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
  @UseGuards(AuthGuard())
  @Get(':id')
  find(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._usersService.find(params.id);
  }
}
