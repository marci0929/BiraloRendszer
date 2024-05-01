import { Db, MongoClient } from "../node_modules/mongodb";
import * as dotenv from "dotenv";

let db: Db;
export async function initConnection() {
    dotenv.config();
    const { ATLAS_URI } = process.env;
    const client = new MongoClient(ATLAS_URI!);
    let conn;

    try {
        conn = await client.connect();
    } catch (e) {
        console.error(e);
    }

    db = conn!.db("BiroDatabase");
}

export function getDB() {
    return db;
}
