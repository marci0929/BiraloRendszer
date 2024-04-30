import * as mongodb from "mongodb";
import { Biralo } from "./Model/Biralo";

export const collections: {
    biralok?: mongodb.Collection<Biralo>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const biralokCollection = db.collection<Biralo>("biralok");
    collections.biralok = biralokCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
            },
        },
    };

    await db.command({
        collMod: "biralok",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("biralok", { validator: jsonSchema });
        }
    });
}