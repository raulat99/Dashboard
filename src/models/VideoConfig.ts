import mongoose, {Schema, Types} from "mongoose";


export interface VideoConfig
{
    _id?: Types.ObjectId;
    videoID: number,
    fps: number
    url: string
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
});

export default mongoose.models.VideoConfig || mongoose.model<VideoConfig>('VideoConfig', VideoConfigSchema);
