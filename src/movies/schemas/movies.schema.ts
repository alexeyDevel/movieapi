import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
  @Prop()
  rating: number;
  @Prop()
  cover: string;
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
