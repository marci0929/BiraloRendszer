import * as mongodb from "mongodb";

export interface Publikacio {
    content: string;
    review: string;
    biralok: mongodb.ObjectId[];
    biralatStat: [mongodb.ObjectId, boolean][]
    _id?: mongodb.ObjectId;
}