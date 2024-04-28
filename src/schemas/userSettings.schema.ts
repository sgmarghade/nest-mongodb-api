import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings {
  @Prop({ required: false, default: false })
  receiveNotification?: boolean;

  @Prop({ required: false, default: false })
  receiveEmail?: boolean;

  @Prop({ required: false, default: false })
  receiveSms?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);