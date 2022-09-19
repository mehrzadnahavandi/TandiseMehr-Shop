import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
    // to get only unique values use 'Set' and to get data from Set object we use spread function '...'  then we can add 'all' too
    let companies = ['all', ...new Set (store.map((item) => item.company))] 
    // console.log(companies);
    const companieDOM = getElement('.companies')
    companieDOM.innerHTML = companies.map((company) => {
        return `<button class="company-btn">${company}</button>`
    }).join('')
    companieDOM.addEventListener('click', function(e){
        // we want to check if the clicked company is a button we use target then we set up the filter to only return related products
        const element = e.target
        if(element.classList.contains('company-btn')){
            let newStore = []
            if(element.textContent === 'all'){
                // it is all button, we need all the products in store
                newStore = [...store]
            } else{
                newStore = store.filter((product) => product.company === element.textContent)
            }
            display(newStore, getElement('.products-container'),true)
        }
    })
};

export default setupCompanies;
