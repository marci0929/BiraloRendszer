import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBiraloPubConnection extends Document {
    pubId: number;
    biralo1_email: string;
    biralo2_email: string;
    biralo1_approved: boolean;
    biralo2_approved: boolean;
}

const BiraloPubConnectionSchema: Schema<IBiraloPubConnection> = new mongoose.Schema({
    pubId: { type: Number, required: true },
    biralo1_email: { type: String, required: true },
    biralo2_email: { type: String, required: true },
    biralo1_approved: { type: Boolean, required: true },
    biralo2_approved: { type: Boolean, required: true },
});

export const BiraloPubConnection: Model<IBiraloPubConnection> = mongoose.model<IBiraloPubConnection>('BiraloPubConnection', BiraloPubConnectionSchema, 'BiraloPubConnection');
