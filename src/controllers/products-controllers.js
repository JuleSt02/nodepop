import {Product} from '../models/product-model.js'
 import {User} from '../models/user-model.js'
 import {getProductsByUserWithFilter} from '../repositories/product-repository.js'
 import { validatePaginationData, validatePrices, validateProductName , validateSort} from './product-filter-helpers.js'
 import { validateNewProduct } from './product-validation-helpers.js'

 export async function productsPageController(req, res, next){

    const title = 'Products'
    const ownerId = req.session.userId
    const rawData = {ownerTags:req.query.tag, minPriceRaw:req.query.minPrice, maxPriceRaw:req.query.maxPrice,
                    productNameRaw: req.query.productName, rawSort: req.query.sort
    }
    let errorMessage = ""
    
    //Validate data:
    //Prices
    const priceValidation = validatePrices(rawData.minPriceRaw, rawData.maxPriceRaw)
    
    if (priceValidation.errorMessage){
        errorMessage = priceValidation.errorMessage
    };
   
    //Validate ProductName
    const productNameValidation = validateProductName(rawData.productNameRaw)
    if (productNameValidation.errorMessage) {
        errorMessage = productNameValidation.errorMessage
    }
    //Build filters
    const filters = {tags : rawData.ownerTags, minPrice: priceValidation.priceFilter.minPrice, 
                     maxPrice: priceValidation.priceFilter.maxPrice, name : productNameValidation.nameFilter}

    //Validate pagination queries
    const rawPagination = {rawLimit : req.query.limit, rawPage : req.query.page}
    const paginationData = validatePaginationData(rawPagination.rawLimit, rawPagination.rawPage)
   
    //Validat sort 
    const sort = validateSort(rawData.rawSort)




    //Obtain data from Model 
    let  productsByUserWithFilters = []
    if(!errorMessage) {
        productsByUserWithFilters = await getProductsByUserWithFilter(ownerId, filters, paginationData, sort)
    };

    return res.render('products.html', {
    title: title,
    allProducts:productsByUserWithFilters,
    errorMessage:errorMessage 


 });
};


//POST NEW PRODUCT

export async function newProductController(req,res,next) {

    return res.render('product-form.html', {
    title: 'Post new product'
    });

}

export async function createProductController(req,res,next) {

    const rawData = {name : req.body.name, price : req.body.price}
     
    //Validate data
    const validatedProduct = validateNewProduct(rawData);
    

    //If error, re-render same page with message
    if(validatedProduct.errorMessage){
        return res.render('product-form.html', {
            title: 'Post new product',
            errorMessage: validatedProduct.errorMessage,
            values: rawData
        });

    }
    
    //Add owner
    validatedProduct.validatedData.owner = req.session.userId

    //Create product
    const newProduct = await Product.create(validatedProduct.validatedData)

    return res.redirect('/products')

}


//Delete Controller

export async function deleteProductController(req,res,next) {

    const productId = req.params.productId
    const ownerId = req.session.userId

    await Product.deleteOne({
        _id:productId,
        owner:ownerId
    });

    return res.redirect('/products')

}