import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBiraloPubConnection extends Document {
    pubId: number;
    biralo_email: string;
    biralo_approved: boolean;
}

const BiraloPubConnectionSchema: Schema<IBiraloPubConnection> = new mongoose.Schema({
    pubId: { type: Number, required: true },
    biralo_email: { type: String, required: true },
    biralo_approved: { type: Boolean, required: true },
});

export const BiraloPubConnection: Model<IBiraloPubConnection> = mongoose.model<IBiraloPubConnection>('BiraloPubConnection', BiraloPubConnectionSchema, 'BiraloPubConnection');
