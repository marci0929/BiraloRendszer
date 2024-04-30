import * as mongodb from "mongodb";
import { IBiralo } from "./Model/Biralo";

export const collections: {
    biralok?: mongodb.Collection<IBiralo>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("BiroDatabase");
    await applySchemaValidation(db);

    const biralokCollection = db.collection<IBiralo>("biralok");
    collections.biralok = biralokCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    await db.command({
        collMod: "biralok",
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("biralok", {});
        }
    });
}