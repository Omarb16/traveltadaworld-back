import { NotificationDto } from './dto/notification.dto';
import { NotificationsService } from './notifications.service';
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
  Headers,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { HandlerParams } from 'src/validators/handler-params';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { NotificationEntity } from './entities/notification.entity';

@ApiTags('notifications')
@ApiConsumes('application/json')
@Controller('notifications')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class NotificationsController {
  /**
   * Class constructor
   * @param _notificationsService
   */
  constructor(private readonly _notificationsService: NotificationsService) {}

  /**
   * Handler to answer in to POST /notifications route
   *
   * @param {notificationDto} NotificationDto data to create
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns NotificationEntity',
    type: NotificationEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body() notificationDto: NotificationDto,
  ): Observable<NotificationEntity> {
    return this._notificationsService.create(notificationDto);
  }

  /**
   * Handler to answer in to PUT /notifications/:id route
   *
   * @param {HandlerParams} params notifiaction id
   * @param {notificationDto} NotificationDto data to update
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Update a notification',
    type: NotificationEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Notification with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() notificationDto: NotificationDto,
  ): Observable<NotificationEntity> {
    return this._notificationsService.update(params.id, notificationDto);
  }

  /**
   * Handler to answer in to GET /notifications route
   *
   * @param {string} auth user authorization
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return user notifications',
    type: NotificationEntity,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Get()
  find(
    @Headers('authorization') auth: string,
  ): Observable<NotificationEntity[]> {
    return this._notificationsService.find(auth);
  }

  /**
   * Handler to answer in to DELETE /notifications/:id route
   *
   * @param {HandlerParams} params notification id
   * @param {string} auth user authorization
   *
   * @returns Observable<NotificationEntity>
   */
  @ApiOkResponse({
    description: 'Delete a notification',
    type: NotificationEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Notification with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(
    @Param() params: HandlerParams,
    @Headers('authorization') auth: string,
  ): Observable<void> {
    return this._notificationsService.delete(params.id, auth);
  }

  /**
   * Handler to answer in to Get /notifications/count route
   *
   * @param {string} auth user authorization
   *
   * @returns Observable<Number>
   */
  @ApiOkResponse({
    description: 'Return user notifications length',
    type: NotificationEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Get('/count')
  count(@Headers('authorization') auth: string): Observable<Number> {
    return this._notificationsService.count(auth);
  }
}
