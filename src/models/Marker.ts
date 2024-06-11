
import mongoose, {Schema, Types} from "mongoose";

export interface MarkerConfiguration {
    color: string
    selectionColor: string
  }  

export interface Marker {
    _id?: Types.ObjectId;
    id: number,
    time: number
    title: string,
    description?: string,
  }
  
  const MarkerSchema = new Schema<Marker>({
    id: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});

export default mongoose.models.Marker || mongoose.model<Marker>('Marker', MarkerSchema);
