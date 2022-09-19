import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
    const priceInput = getElement('.price-filter')
    const priceValue = getElement('.price-value')

    // set up filter
    let maxPrice = store.map((product) => product.price)
    // console.log(maxPrice);
    // use Math method to get the max price
    maxPrice = Math.max(...maxPrice)
    maxPrice = Math.ceil(maxPrice / 100)
    // changing the html attributes:
    priceInput.value = maxPrice 
    priceInput.max = maxPrice
    priceInput.min = 0
    priceValue.textContent = `Value : $${maxPrice}`

    priceInput.addEventListener('input', function () {
        // output of range is string we need to change it number
        const value = parseInt(priceInput.value)
        priceValue.textContent = `value : $${value}`
        // finding products with price less than price(value) from range
        let newStore = store.filter((product) => product.price / 100 <= value)
        display(newStore, getElement('.products-container'),true)
        if(newStore.length < 1){
            const products = getElement('.products-container')
            products.innerHTML = `<h3 class='filter-error'>
            sorry, no products found
            </h3>`
        }
    });
};

export default setupPrice;
