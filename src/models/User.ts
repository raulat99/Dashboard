import mongoose, { Schema, Types } from 'mongoose';

export interface User {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  surname: string;
  dashboards?: Types.ObjectId[];
  
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
  dashboards:[{
    type: Schema.Types.ObjectId,
    ref: 'Dashboard',
    required: false,
  }],
});
export default mongoose.models.User || mongoose.model('User', UserSchema);
