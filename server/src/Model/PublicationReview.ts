import mongoose, { Document, Model, Schema } from 'mongoose';

interface IPublicationReview extends Document {
    pubId: number;
    reviewContent: string;
}

const PublicationReviewSchema: Schema<IPublicationReview> = new mongoose.Schema({
    pubId: { type: Number, required: true },
    reviewContent: { type: String, required: true },
});

export const PublicationReview: Model<IPublicationReview> = mongoose.model<IPublicationReview>('PublicationReview', PublicationReviewSchema, 'PublicationReview');
