import * as mongodb from "mongodb";

export interface Szerkeszto {
    neve: string;
    email: string;
    pass: string;
    pubsReviewed: mongodb.ObjectId[];
    _id?: mongodb.ObjectId;
}