 import {Product} from '../models/product-model.js'


export async function getProductsByUserWithFilter(ownerId, filters, paginationData, sort) {

    const query = {};
    query.owner = ownerId;

    if(filters.tags){
        query.tags = filters.tags
    }
    // if minPrice ===  condition fails, better to check for undefined. 
    if(filters.minPrice  !== undefined && filters.maxPrice !== undefined){
      query.price = {
      $gte: filters.minPrice,
      $lte: filters.maxPrice
    }
  };
    
  //Apply regex for "starts with" filter logic
    if(filters.name){
  
        query.name = new RegExp('^' + filters.name, 'i')
};



    return Product.find(query)
    .sort({[sort]: 1})
    .skip(paginationData.skip)
    .limit(paginationData.limit)


};
