import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const biraloRouter = express.Router();
biraloRouter.use(express.json());

biraloRouter.get("/", async (_req, res) => {
    try {
        const biralok = await collections?.biralok?.find({}).toArray();
        res.status(200).send(biralok);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

biraloRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const biralo = await collections?.biralok?.findOne(query);

        if (biralo) {
            res.status(200).send(biralo);
        } else {
            res.status(404).send(`Failed to find an biralo: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an biralo: ID ${req?.params?.id}`);
    }
});

biraloRouter.post("/", async (req, res) => {
    try {
        const biralo = req.body;
        const result = await collections?.biralok?.insertOne(biralo);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new biralo: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new biralo.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

biraloRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const biralo = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.biralok?.updateOne(query, { $set: biralo });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an biralo: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an biralo: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an biralo: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

biraloRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.biralok?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an biralo: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an biralo: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an biralo: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
