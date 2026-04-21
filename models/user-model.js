import mongoose, {Schema} from 'mongoose';
import {MODELS} from './models.js'


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

        
    }
)

//if a model called user exists, use it               else: create it from this schema 
export const User =  moongose.models[MODELS.USER] || moongose.model(MODELS.PRODUCT,userSchema);