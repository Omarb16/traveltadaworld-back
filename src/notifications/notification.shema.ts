import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NotificationDocument = Notification & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  versionKey: false,
})
export class Notification {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  content: string;

  @Prop({
    type: Boolean,
    required: true,
    trim: true,
  })
  seen: boolean;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  userId: string;

  constructor(partial: Partial<Notification>) {
    Object.assign(this, partial);
  }
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
