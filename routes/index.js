import express, { Router } from 'express';
import actorRouter from "./actors.js";
import showRouter from "./shows.js";

const mainRouter = express.Router();

mainRouter.use('/shows', showRouter);

mainRouter.use('/actors', actorRouter);

export default mainRouter;