import express from 'express'
import {createShow, getAll } from '../controllers/showsControllers.js'

const showRouter = express.Router();

showRouter.get('/', getAll)

showRouter.post('/', createShow);

export default showRouter;