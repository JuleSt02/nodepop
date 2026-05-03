import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';
 
import  {productsRouter} from './routes/products-routes.js';
import {pagesRouter} from './routes/pages-routes.js';
import { authRouter } from './routes/auth-routes.js';
import { dataInViews } from './middleware/views-middleware.js';
import { sessionInViews, sessionMiddleWare, guard} from './middleware/auth-middleware.js';

const app = express();
const appDir = dirname(fileURLToPath(import.meta.url));


//Global Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(appDir, '../public'))); //when working with ES modules
app.use(morgan('tiny'));
app.use(dataInViews);


//Auth Middleware
app.use(sessionMiddleWare)
app.use(sessionInViews);

//Routes
app.use('/', pagesRouter);
app.use('/', authRouter);
app.use('/products', guard, productsRouter);





//Setup EJS template engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', join(appDir, 'views'));

export default app

