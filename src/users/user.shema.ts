import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  versionKey: false,
})
export class User {
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
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  firstname: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  lastname: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  description: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  photo: string;

  @Prop({
    type: Date,
    required: true,
  })
  birthDate: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  address: string;

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
  postalCode: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  phone: string;

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

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
