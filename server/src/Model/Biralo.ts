import * as mongodb from "mongodb";

export interface Biralo {
    neve: string;
    email: string;
    pass: string;
    pubsForReview: mongodb.ObjectId[];
    pubsReviewed: mongodb.ObjectId[];
    _id?: mongodb.ObjectId;
}