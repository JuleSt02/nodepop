import express from 'express'
import { homePageController } from '../controllers/page-controller.js'

export const pagesRouter = express.Router()

//R:
pagesRouter.get('/', homePageController);