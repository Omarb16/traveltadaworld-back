import { CreateNotificationDto } from './dto/create-notification.dto';
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
import { UpdateNotificationDto } from './dto/update-notifications.dto';

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
   * Handler to answer in to POST /notifications/logIn route
   *
   * @param {LoginNotificationDto} loginNotificationDto data to login
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns notification id',
    type: NotificationEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @Post()
  logIn(@Body() createNotificationDto: CreateNotificationDto) {
    return this._notificationsService.create(createNotificationDto);
  }

  /**
   * Handler to answer in to POST /notifications route
   *
   * @param {HandlerParams} params list of route params to take notification id
   * @param {UpdateNotificationDto} updateNotificationDto data to update
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Update an notification',
    type: NotificationEntity,
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Headers('authorization') auth: string,
  ): Observable<NotificationEntity> {
    return this._notificationsService.update(
      params.id,
      updateNotificationDto,
      auth,
    );
  }

  /**
   * Handler to answer in to POST /notifications/:id route
   *
   * @param {HandlerParams} params list of route params to take notification id
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return an notification',
    type: NotificationEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Notification with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Get(':id')
  find(@Param() params: HandlerParams): Observable<NotificationEntity> {
    return this._notificationsService.find(params.id);
  }

  /**
   * Handler to answer in to POST /notifications/:id route
   *
   * @param {HandlerParams} params list of route params to take notification id
   *
   * @returns Observable<NotificationEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Return an notification',
    type: NotificationEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Notification with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(AuthGuard())
  @Get(':id')
  delete(@Param() params: HandlerParams): Observable<NotificationEntity> {
    return this._notificationsService.delete(params.id);
  }
}
