import mongoose,{Schema} from 'mongoose';
import {MODELS} from './models.js'


const productSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required:true,
        },

        owner : {
            type:Schema.Types.ObjectId,
            ref:MODELS.USER,
        } ,

        tags : [{
            type: String,
            trim: true,
        }]
    },
    
    {
        timestamps:true,
    }
);

export const Product = mongoose.models[MODELS.PRODUCT] || mongoose.model(MODELS.PRODUCT, productSchema);
