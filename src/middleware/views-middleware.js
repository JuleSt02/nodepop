

export async function dataInViews(req, res, next) {
   // const postedProducts = await countPostedProducts();
   //res.locals.postedProduvts = postedProducts; 
   //next();
    
   res.locals.errorMessage = null;
   next(); //no error if we want to pass an errorMessage
}