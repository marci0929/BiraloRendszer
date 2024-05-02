import mongoose, { Document, Model, Schema } from 'mongoose';

interface IPubUserConnection extends Document {
    userEmail: string;
    pubId: number;
}

const PubUserConnectionSchema: Schema<IPubUserConnection> = new mongoose.Schema({
    userEmail: { type: String, required: true },
    pubId: { type: Number, required: true },
});

export const PubUserConnection: Model<IPubUserConnection> = mongoose.model<IPubUserConnection>('PubUserConnection', PubUserConnectionSchema, 'PubUserConnection');
