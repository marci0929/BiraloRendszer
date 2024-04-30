import * as mongodb from "mongodb";

export interface Szerzo {
    neve: string;
    email: string;
    pass: string;
    publikaciokId: mongodb.ObjectId[];
    _id?: mongodb.ObjectId;
}