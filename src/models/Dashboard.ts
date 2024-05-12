import mongoose, { Schema, Types } from 'mongoose';
import { SignalConfig } from './SignalConfig';
import { VideoConfig } from './VideoConfig';
import { Marker } from './Marker';

export interface Dashboard {
  _id?: Types.ObjectId;
  description: string;
  dateCreation: Date;
  signals?: SignalConfig[];
  videos?: VideoConfig[];
  markers?: Marker[];
}

const DashboardSchema = new Schema<Dashboard>({
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
export default mongoose.models.Dashboard || mongoose.model('Dashboard', DashboardSchema);
