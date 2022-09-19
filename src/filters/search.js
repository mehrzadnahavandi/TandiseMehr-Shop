import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
    const form = getElement('.input-form')
    const nameInput = getElement('.search-input')
    // to search based on alphabet we use key up
    form.addEventListener('keyup', () => {
        const value = nameInput.value
        // console.log(value);
        if(value){
            const newStore = store .filter((product) =>{
                let {name} = product
                // console.log(name);
                name = name.toLowerCase()
                if(name.startsWith(value)){
                    return product
                }
            })
            // console.log(newStore);
            display(newStore, getElement('.products-container'),true)
            if(newStore.length < 1){
                const products = getElement('.products-container')
                products.innerHTML = `<h3 class='filter-error'>
                sorry, no products found
                </h3>`
            }
        }else{
            display(store, getElement('.products-container'),true)
        }
    })
};

export default setupSearch;
