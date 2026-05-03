import mongoose, {Schema} from 'mongoose';
import {MODELS} from './models.js'

import {hash, compare} from 'bcrypt'

const userSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique:true,
        },

        password: {
            type: String,
            select: false, //Model wont obtain passwords
        }

        
    }
)

// //1: Hash password
// const hashPassword = (clearPassword) => {
//     return hash(clearPassword,7)
// }

// const hashedPassword = await hashPassword();

// //2: Compara Passwords

// const comparePassword = (plainPassword, hash) => {
//     return compare(plainPassword,hash);
// }

// Class method
userSchema.statics.hashPassword = (clearPassword) => {
    return hash(clearPassword,7);
}


//Instance method  that will be added to all future document instances
//*never arrow functions because no access to .this
//  .this gives us access to the password property  of that instance

userSchema.methods.comparePassword = function(plainPassword) {
    return compare(plainPassword, this.password);
}

//if a model called user exists, use it               else: create it from this schema 
export const User =  mongoose.models[MODELS.USER] || mongoose.model(MODELS.USER,userSchema);