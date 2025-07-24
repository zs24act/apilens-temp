import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Api } from '../../apis/schemas/api.schema';

export type ApiChangeDocument = ApiChange & Document;

@Schema({ timestamps: true })
export class ApiChange {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Api', required: true })
  api: Api;

  @Prop({ type: Object })
  diff: any;
}

export const ApiChangeSchema = SchemaFactory.createForClass(ApiChange);
