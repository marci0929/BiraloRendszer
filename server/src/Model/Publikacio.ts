import mongoose, { Document, Model, Schema } from 'mongoose';

interface IPublication extends Document {
    id: number;
    pubName: string;
    content: string;
}

const PublicationSchema: Schema<IPublication> = new mongoose.Schema({
    id: { type: Number, required: true },
    pubName: { type: String, required: true },
    content: { type: String, required: true },
});

export const Publication: Model<IPublication> = mongoose.model<IPublication>('Publication', PublicationSchema, 'Publications');
