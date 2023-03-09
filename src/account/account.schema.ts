import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema({ versionKey: false, autoIndex: true, timestamps: { createdAt: true, updatedAt: true }, })
export class Account {

    @ApiProperty({ type: String, description: "Адрес ETH кошелька" })
    @Prop({ index: true, required: true, unique: true, type: String })
    address: Lowercase<string>;

    @ApiProperty({ type: String, description: "Адрес BTC кошелька" })
    @Prop({ index: true, required: false, unique: false, type: String })
    btcAddress: Lowercase<string>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);

