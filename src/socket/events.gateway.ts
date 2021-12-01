import { Notification } from './../notifications/notification.shema';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer() server: Server;
  logger: Logger = new Logger('AppGateway');
  dict: { [id: string]: string };
  constructor(private readonly _jwtService: JwtService) {
    this.dict = {};
  }

  @SubscribeMessage('sendToServer')
  handleMessage(client: Socket, notification: Notification): void {
    console.log(notification);
    console.log(this.dict);
    this.server
      .to(this.dict[notification.userId])
      .emit('sendNotiftoClient', notification);
  }

  @SubscribeMessage('subscribe')
  subscribe(client: Socket, auth: string) {
    this.dict[this._jwtService.decode(auth.replace('Bearer ', '')).sub] =
      client.id;
  }

  @SubscribeMessage('unsubscribe')
  unsubscribe(client: Socket, auth: string) {
    delete this.dict[this._jwtService.decode(auth.replace('Bearer ', '')).sub];
  }
}
