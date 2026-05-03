

export function validateNewProduct(rawData){
    
    let errorMessage = ''
    //trim is only called if  rrawData.name exists
    const name = rawData.name?.trim()
    const price = Number(rawData.price)
    const validatedData = {}

    if(!rawData.name  || !rawData.price) {
        return {
            errorMessage: 'Field can´t be empty',
            validatedData: {}
        }
    };

    const pattern = /^[a-zA-Z\s]+$/
    if(!pattern.test(name)
    ){
        return {
            errorMessage :'Name field can only contain letters',
            validatedData: {}
        }
    };
    
    if (Number.isNaN(price)) {
        return {
            errorMessage:'Price must be numeric',
            validatedData: {}
        }
    };

    if (price <= 0) {
            return {
            errorMessage:'Price must greater than 0',
            validatedData: {}
        }

    }
    
    return {
        errorMessage: errorMessage,
        validatedData : {
            name,
            price
        }
    };
    
};
