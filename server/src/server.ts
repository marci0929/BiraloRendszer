import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { biraloRouter } from "./Routes/biralo.routes";
import mongoose from "mongoose";
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();

const { ATLAS_URI } = process.env;

const app = express();
const port = 5200;

mongoose.connect(ATLAS_URI!).then((_) => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
    return;
});

mongoose.connection.useDb("BiroDatabase");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/biralo_db', biraloRouter);

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

console.log('After server is ready.');