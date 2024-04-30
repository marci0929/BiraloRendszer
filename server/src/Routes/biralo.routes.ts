import * as express from "express";
import * as mongodb from "mongodb";
import { Router, Request, Response, NextFunction } from 'express';
import { Biralo } from '../Model/Biralo';
import bodyParser from 'body-parser';
import mongoose from "mongoose";

export const biraloRouter = express.Router();
biraloRouter.use(bodyParser.urlencoded({ extended: true }));


biraloRouter.post('/register', (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.pass;
    const name = req.body.name;

    let userType = 1;
    if (userType == 1) {
        const user = new Biralo({ email: email, pass: password, name: name, pubsForReview: [], pubsReviewed: [] });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    }
});
