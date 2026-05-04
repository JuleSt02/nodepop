

export function validatePrices(minPriceRaw, maxPriceRaw) {

    const priceFilterAttemped = minPriceRaw || maxPriceRaw

    //If no priceFilter was used return empty - consisteng return shape
    if (!priceFilterAttemped) {

        return {
            errorMessage : '',
            priceFilter : {}
        }
    };

    if (!minPriceRaw || !maxPriceRaw) {

        return {
            errorMessage: 'Both fields are required',
            priceFilter: {}
        }
    };
    const minPrice = Number(minPriceRaw);
    const maxPrice = Number(maxPriceRaw);
    if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)){

        return {
            errorMessage: 'Price fields must be numeric',
            priceFilter: {}
        }
    };

    if (maxPrice < minPrice) {
        return {
            errorMessage: 'Max. price needs to be greater than min. price',
            priceFilter: {}
        }
    };



    return  {
        errorMessage: '',
        priceFilter : {minPrice, maxPrice}
    }

    
};


export function validateProductName(productNameRaw)  {

    const productNameAttempt = productNameRaw

    if(!productNameAttempt){
        return  {
            errorMessage:'',
            nameFilter: ''
        }
    };

    if(productNameRaw === '') {
        return {
            errorMessage: 'Field can´t be empty',
            nameFilter: ''
        }
    };

    const pattern = /^[a-zA-Z\s]+$/
    if(!pattern.test(productNameRaw)
    ){
        return {
            errorMessage :'Product field can only contain letters',
            nameFilter: ''
        }
    };
    const productName = productNameRaw
    return {
        errorMessage: '',
        nameFilter: productName
    }


      

}
export function validatePaginationData(rawLimit, rawPage) {
    
    const paginationData = {}
    let  limit = Number(rawLimit)
    let page = Number(rawPage)

    if (Number.isNaN(limit) || limit <1 ) {
        limit = 3
       
    }

    if (Number.isNaN(page) || page < 1 ) {
        page  = 1
        
    };
    
    const skip = (page - 1) * limit 
    paginationData.limit = limit
    paginationData.skip = skip
    paginationData.page = page
    return paginationData 

    };

export function validateSort(rawSort) {
    
    let  sort = ''
    if(rawSort === 'name' || rawSort === 'price') {
        sort = rawSort
    } 
    else {
        sort = 'name'
    }
    return sort
};

  
    


    //  if (req.query.limit && req.query.page) {
    //     const numberLimit = Number(req.query.limit)
    //     const numberPage = Number(req.query.page)
        
    //     const calculatedSkip = (numberPage - 1) * numberLimit
    //     paginationData.limit = numberLimit
    //     paginationData.skip = calculatedSkip

