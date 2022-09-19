import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
    const response = await fetch(allProductsUrl).catch((err) => 
    console.log(err))
    console.log(response);
    if(response) {
        return response.json()
    }
    return response
};

export default fetchProducts;
