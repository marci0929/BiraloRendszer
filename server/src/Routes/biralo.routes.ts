import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import { Biralo } from '../Model/Biralo';
import bodyParser from 'body-parser';
import { getDB } from '../connection'
import { ObjectId } from "../../node_modules/mongodb";

export const biraloRouter = express.Router();
biraloRouter.use(bodyParser.urlencoded({ extended: true }));


biraloRouter.post('/register', async (req: Request, res: Response) => {
    let collection = getDB().collection("Users");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

biraloRouter.post('/login', async (req: Request, res: Response) => {
    let collection = getDB().collection("Users");
    let query = { email: req.body.email, pass: req.body.pass };
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

biraloRouter.get('/', async (req, res) => {
    let collection = getDB().collection("Users");
    let results = await collection.find({})
        .limit(50)
        .toArray();
    res.send(results).status(200);
})

// Get a single User
biraloRouter.get("/:id", async (req, res) => {
    let collection = getDB().collection("Users");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

biraloRouter.post("/", async (req, res) => {
    let collection = getDB().collection("Users");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

// Delete User
biraloRouter.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = getDB().collection("Users");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
});