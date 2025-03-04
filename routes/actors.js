import express from 'express'
import createActor from '../controllers/actorsControllers.js'

const actorRouter = express.Router();

actorRouter.post('/', createActor);

export default actorRouter;