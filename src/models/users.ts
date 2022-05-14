import { Prop, getModelForClass, prop } from "@typegoose/typegoose";

class User {
  @prop({ required: true, trim: true })
  nickname: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @prop({ required: true })
  birthday: string; // TODO: change dor the correct date format

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: false, trim: true })
  favoriteGames: Array<string>;

  @Prop({ required: true, default: 3 })
  roleId: number;

  @Prop({ required: true, default: false })
  verified: boolean;

  @Prop({ default: 0})
  points: number;

  @Prop()
  lastLogin: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
