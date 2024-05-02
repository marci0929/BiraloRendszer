import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { getDB } from '../connection'
import { ObjectId } from "../../node_modules/mongodb";
import { PassportStatic } from "passport";
import { User } from "../Model/User";
import { Publication } from "../Model/Publikacio";
import { NewPublicationComponent } from '../../../client/src/app/new-publication/new-publication.component';
import { PubUserConnection } from "../Model/PubUserConnection";


export function makeRouter(passport: PassportStatic) {
    const biraloRouter = express.Router();
    biraloRouter.use(bodyParser.urlencoded({ extended: true }));


    biraloRouter.post('/register', async (req: Request, res: Response) => {
        const email = req.body.email;
        const pass = req.body.pass;
        const name = req.body.name;
        const rank = req.body.rank;
        const user = new User({ email: email, pass: pass, name: name, rank: rank });

        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    biraloRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local',
            {
                successRedirect: '/home',
                failureRedirect: '/login',
                failureFlash: true
            },
            (error: string | null, user: typeof User) => {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                } else {
                    if (!user) {
                        res.status(400).send('User not found.');
                    } else {
                        req.login(user, (err: string | null) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('Internal server error.');
                            } else {
                                res.status(200).send(user);
                            }
                        });
                    }
                }
            })(req, res, next);
    });

    biraloRouter.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    biraloRouter.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    });

    biraloRouter.post('/addPublication', async (req: Request, res: Response) => {
        const id = (await Publication.countDocuments()) + 1;
        const pubName = req.body.pubName;
        const content = req.body.content;
        let publication = new Publication({ id, pubName, content });

        publication.save();

        const pubEmail = req.body.userEmail;
        let pubUserConn = new PubUserConnection({ pubId: id, userEmail: pubEmail });

        pubUserConn.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })

    });

    biraloRouter.get('/', async (req, res) => {
        let collection = getDB().collection("Users");
        let results = await collection.find({})
            .limit(50)
            .toArray();
        res.send(results).status(200);
    })

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

    biraloRouter.delete("/:id", async (req, res) => {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = getDB().collection("Users");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    });

    return biraloRouter;
}