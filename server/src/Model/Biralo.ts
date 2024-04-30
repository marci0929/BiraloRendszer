import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IBiralo extends Document {
    name: string;
    email: string;
    pass: string;
    pubsForReview: Types.ObjectId[];
    pubsReviewed: Types.ObjectId[];
    _id?: Types.ObjectId;
}

const BiraloSchema: Schema<IBiralo> = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    pass: { type: String, required: true },
    pubsForReview: { type: [{ type: Types.ObjectId, ref: 'Pub' }], required: true },
    pubsReviewed: { type: [{ type: Types.ObjectId, ref: 'Pub' }], required: true },
});

export const Biralo: Model<IBiralo> = mongoose.model<IBiralo>('Biralo', BiraloSchema, "BiroDatabase");
