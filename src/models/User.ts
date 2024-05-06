import mongoose, { Schema, Types } from 'mongoose';
import SessionUser from './Session';

export interface User {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  surname: string;
  sessionUser?: Types.ObjectId;
  
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  sessionUser:{
    type: Schema.Types.ObjectId,
    required: false,
  },
});
export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
