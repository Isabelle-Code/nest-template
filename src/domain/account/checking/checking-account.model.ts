import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CheckingAccountDocument = HydratedDocument<CheckingAccount>;

@Schema()
export class CheckingAccount {
  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  number: string;

  @Prop({
    min: 0,
    default: 0,
  })
  balance: number;

  @Prop({
    default: true,
  })
  active: boolean;
}

export const CheckingAccountSchema =
  SchemaFactory.createForClass(CheckingAccount);
