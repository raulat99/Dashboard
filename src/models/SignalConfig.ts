import mongoose, {Schema, Types} from "mongoose";

interface LabelConfigProp{
    labelId: number,
    name: string,
    value: string
}

interface ValueConfigProp{
    idValue: number,
    sample: any,
    timestamp: number
}

export interface SignalConfig{
    _id?: Types.ObjectId;
    name: string,
    descripcion: string,
    signalID: number,
    labels: LabelConfigProp[],
    values: ValueConfigProp[]
}

const SignalConfigSchema = new Schema<SignalConfig>({
    name: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    signalID: {
        type: Number,
        required: true,
    },
    labels: [{
        labelId: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    }],
    values: [{
        idValue: {
            type: Number,
            required: true,
        },
        sample: {
            type: Schema.Types.Mixed,
            required: true,
        },
        timestamp: {
            type: Number,
            required: true,
        },
    }],
});

export default mongoose.models.SignalConfig || mongoose.model<SignalConfig>('SignalConfig', SignalConfigSchema);
