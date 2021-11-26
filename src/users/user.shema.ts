import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

export class User {
  _id: any;
  email: string;
  username: string;
  photo: string;
  birthDate: Date;
  nationality: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
