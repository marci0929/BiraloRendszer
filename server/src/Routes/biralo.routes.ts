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
import { PublicationReview } from "../Model/PublicationReview";
import { BiraloPubConnection } from "../Model/BiraloPubConnection";


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

    biraloRouter.get('/getPublicationsForEmail:email', async (req: Request, res: Response) => {
        let pubIdsForEmail = await PubUserConnection.find({ userEmail: req.query.email });
        let pubIds: number[] = new Array<number>();

        for (let pub of pubIdsForEmail) {
            pubIds.push(pub["pubId"])
        }

        let pubs = await Publication.find({ id: { $in: pubIds } });

        res.send(pubs).status(200);
    });

    biraloRouter.get('/getAllPublication', async (req: Request, res: Response) => {
        let pubs = await Publication.find();

        res.send(pubs).status(200);
    });

    biraloRouter.get('/getUsersByRank:rank', async (req: Request, res: Response) => {
        let usersByRank = await User.find({ rank: req.query.rank });
        res.send(usersByRank).status(200);
    });

    biraloRouter.post('/saveReview', async (req: Request, res: Response) => {
        const filter = { pubId: req.body.pubId };
        const update = { reviewContent: req.body.reviewContent };

        PublicationReview.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        }).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

    biraloRouter.get('/getPublicationById:id', async (req: Request, res: Response) => {
        let pubIdsForEmail = await Publication.findOne({ id: req.query.id });
        console.log(req.query.id)
        res.send(pubIdsForEmail).status(200);
    });

    biraloRouter.get('/reviewById:id', async (req: Request, res: Response) => {
        let pubReview = await PublicationReview.findOne({ pubId: req.query.id });
        res.send(pubReview).status(200);
    });

    biraloRouter.post('/addBiraloToPub', async (req: Request, res: Response) => {
        const filter = { pubId: req.body.pubId };
        const update = {
            biralo1_email: req.body.biralo1_email,
            biralo2_email: req.body.biralo2_email,
            biralo1_approved: req.body.biralo1_approved,
            biralo2_approved: req.body.biralo2_approved,
        };

        BiraloPubConnection.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        }).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

    return biraloRouter;
}