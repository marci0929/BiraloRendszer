import express from "express";
import cors from "cors";
import { makeRouter } from "./Routes/biralo.routes";
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { initConnection } from "./connection";
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const app = express();
const port = 5200;

// initConnection()

dotenv.config();
const { ATLAS_URI } = process.env;

mongoose.connect(ATLAS_URI!, {});

const whitelist = ['*', 'http://localhost:4200']
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
        if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
};

const sessionOptions: expressSession.SessionOptions = {
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/biralodb', makeRouter(passport));

configurePassport(passport);

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

console.log('After server is ready.');