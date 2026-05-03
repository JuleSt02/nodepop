import session from 'express-session';
import ConnectMongo from 'connect-mongo';

const INACTIVITY_2_DAYS = 1000 *60 * 60 *24 *2;

export function guard(req,res,next) {
    if (!req.session.userId) {
        //no login so we redirect to login
        res.redirect('/login');
        return;
    }

    next();

}

export const sessionMiddleWare = session({
    name: 'nodepojs',
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: INACTIVITY_2_DAYS

    },
    store: ConnectMongo.create({
        mongoUrl: process.env.MONGODB_URI
    })
});

export function sessionInViews(req,res,next){
    res.locals.session = req.session;
    next();
}