import express from 'express';

import { productsPageController, newProductController, createProductController, deleteProductController } from '../controllers/products-controllers.js'
import { guard } from '../middleware/auth-middleware.js';

export const productsRouter = express.Router()



//C:
productsRouter.get('/new', newProductController)
productsRouter.post('/', createProductController) 

//R:
productsRouter.get('/', productsPageController)

//D:
productsRouter.post('/:productId/delete', deleteProductController)

