import mongoose, { Schema, Types } from 'mongoose';
import { SignalConfig } from './SignalConfig';
import { VideoConfig } from './VideoConfig';
import { Marker } from './Marker';

export interface SessionUser {
  _id?: Types.ObjectId;
  description: string;
  dateCreation: Date;
  signals?: SignalConfig[];
  videos?: VideoConfig[];
  markers?: Marker[];
}

const SessionUserSchema = new Schema<SessionUser>({
  description: {
    type: String,
    required: true,
  },
  dateCreation: {
    type: Date,
    required: true,
  },
  signals:[],
  videos:[],
  markers:[],
});
export default mongoose.models.SessionUser || mongoose.model<SessionUser>('SessionUser', SessionUserSchema);
