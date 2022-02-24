import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DeliveryDocument = Delivery & Document;

@Schema()
export class Delivery {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  unit: string;
  @Prop({ required: true })
  price: number;
  @Prop()
  deliveryDate?: Date;
  @Prop({ default: Date.now() })
  createdDate: Date;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
