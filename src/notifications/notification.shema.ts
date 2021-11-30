import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    required: false,
    trim: true,
  })
  description: string;

  @Prop({
    type: Boolean,
    required: false,
  })
  delete?: boolean;

  @Prop({
    type: String,
    required: false,
  })
  createdBy: string;

  constructor() {
    this.delete = null;

  }

}

export const TripSchema = SchemaFactory.createForClass(Notification);
