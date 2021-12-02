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
  Headers,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { UserEntity } from './entities/user.entity';
import { HandlerParams } from 'src/validators/handler-params';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/validators/file-helper';
import { AccessToken } from './entities/access-token.entity';

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

  /**
   * Handler to answer in to POST /users/signIn route
   *
   * @param {CreateUserDto} createUserDto data to create
   * @param {Express.Multer.File} file file to upload
   *
   * @returns Observable<AccessToken>
   */
  @ApiOkResponse({
    description: 'Returns user access token',
    type: AccessToken,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('signIn')
  signIn(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<AccessToken> {
    return this._usersService.signIn(createUserDto, file.filename);
  }

  /**
   * Handler to answer in to POST /users/logIn route
   *
   * @param {LoginUserDto} loginUserDto data to login
   *
   * @returns Observable<AccessToken>
   */
  @ApiOkResponse({
    description: 'Returns Access token',
    type: AccessToken,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post('logIn')
  logIn(@Body() loginUserDto: LoginUserDto): Observable<AccessToken> {
    return this._usersService.logIn(loginUserDto);
  }

  /**
   * Handler to answer in to PUT /users/:id route
   *
   * @param {HandlerParams} params user id
   * @param {UpdateUserDto} updateUserDto data to update
   * @param {Express.Multer.File} file file to upload
   * @param {string} auht user authorization
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'Update an user',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier',
    type: String,
    allowEmptyValue: false,
  })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') auth: string,
  ): Observable<UserEntity> {
    return this._usersService.update(params.id, updateUserDto, file, auth);
  }

  /**
   * Handler to answer in to GET /users/:id route
   *
   * @param {HandlerParams} params user id
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
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier',
    type: String,
    allowEmptyValue: false,
  })
  @UseGuards(AuthGuard())
  @Get(':id')
  find(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._usersService.find(params.id);
  }

  /**
   * Handler to answer in to DELETE /user/:id route
   *
   * @param {HandlerParams} params user id
   *
   * @returns Observable<void>
   */
  @ApiOkResponse({
    description: 'Return a user',
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  delete(
    @Param() params: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<void> {
    return this._usersService.delete(params.id, auth);
  }
}
