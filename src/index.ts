import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swagger from 'swagger-ui-express';
import swaggerDocument from "./swagger/swagger.json";
import cors from "cors"
import config from "./util/mongodb"
import mongoose from 'mongoose';
import handleError from './util/handlerError';
import WebSocket from 'websocket';
import { EventEmitter } from 'node:events';
import { Server } from 'node:http';
import { register } from './router/auth';
import * as OneSignal from 'onesignal-node';
import tokenJWT from 'jsonwebtoken';
import fs from 'fs';
import { profile } from './router/profile';

dotenv.config();
const PORT = process.env.PORT || 5030;
const app: Express = express();
const io = new WebSocket.server({ httpServer: new Server });
mongoose
  .connect("mongodb+srv://db-food-redux:authentication9090@db-connect.h1du7.mongodb.net/?retryWrites=true&w=majority", { connectTimeoutMS: 1000 })
  .then((result) => {
    console.log('🍀 connected data mongodb ✅')
  })
  .catch((error) => {
    console.log(error);
    console.log('error data mongodb ❌')
    process.exit(1)
  });
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));
app.use(cors({
  origin: ['https://www.section.io', 'https://www.google.com/'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(handleError)

//TODO -- this PORT server
app.get('/', (req: Request, res: Response) => { res.send(`<h1>Server is running </h1>`); });
register(app);
profile(app);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));


const myEmitter = new EventEmitter();
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
io.on("request", (stream) => {
  console.log('someone connected!');
});