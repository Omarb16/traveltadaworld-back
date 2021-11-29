import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TripDocument = Trip & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Trip {
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
  description: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  city: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  country: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  photo: string;

  @Prop({
    type: [String],
    required: false,
  })
  traveleres: string[];

  @Prop({
    type: Date,
    required: false,
  })
  createdAt: string;

  @Prop({
    type: String,
    required: false,
  })
  createdBy: string;

  @Prop({
    type: Date,
    required: false,
  })
  updatedAt: string;

  @Prop({
    type: String,
    required: false,
  })
  updatedBy: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
