import express from 'express';

import {Product} from '../models/product-model.js';

export async function homePageController(req, res ,next) {
    
    console.log('Session', req.session)
    res.render('index.html', {
        title: 'Homepage',
    });

    
}
