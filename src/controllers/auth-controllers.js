import {MODELS} from '../models/models.js'
import { User } from '../models/user-model.js';

export async function loginPageController(req, res, next) {
    const errorMessage = ''
    
    
    const title = 'Login'

    res.render('login.html',{
        title: title,
        errorMessage,
        values : {}
    });
};

export async function loginActionController(req,res,next) {

    const title = "Login"

    if (!req.body.email ||
        req.body.email === '' ||
        !req.body.password ||
        req.body.password === '') 
    
    {
        const errorMessage = "Email and password are required"
        res.render('login.html', {
            title: 'Sign in',
            values : {
                email:req.body.email,
            }
        
        })
        return;
    }
     
    
    const user = await User.findOne({email: req.body.email})
    .select('+password');//also get password, ncessary to compare with hash




    if (!user ||
        !(await user.comparePassword(req.body.password))
    )
    { const errorMessage = "Invalid email or password"
           res.render('login.html', {
            title: 'Sign in',
            values : {
                email:req.body.email,
            }})
        


    }
    //User id and pwd are correct, session gets linked to user.id
    req.session.userId = user.id;
    console.log(req.session)
    res.redirect('/products');       
    

}


export function logoutActionController(req, res, next) {
    req.session.regenerate((err) => {
        if (err) {
            next(err);
            return;
        }
        // Correct logout
        res.redirect('/');
    });
}