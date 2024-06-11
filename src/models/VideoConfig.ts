import mongoose, {Schema, Types} from "mongoose";

export interface signalID {
    signalID: number;
}

export interface VideoConfig
{
    _id?: Types.ObjectId;
    videoID: number;
    fps: number;
    url: string;
    signalOnVideo: signalID[];
}

const VideoConfigSchema = new Schema<VideoConfig>({
    videoID: {
        type: Number,
        required: true,
    },
    fps: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    signalOnVideo: [{
        signalID: {
            type: Number,
            required: false,
        }
    }]
});

export default mongoose.models.VideoConfig || mongoose.model<VideoConfig>('VideoConfig', VideoConfigSchema);
