// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded',async function () {
    const urlID = window.location.search
    // console.log(urlID);
    try {
        const response = await this.fetch(`${singleProductUrl}${urlID}`)
        // status shows if fetching data is successful
        if (response.status >=200 && response.status <= 299) {
            const product = await response.json()
            // grab data
            const {id, fields} = product;
            productID = id
            // console.log(fields);
            const {name, company, price, colors, description} = fields
            const image = fields.image[0].thumbnails.large.url;
            // console.log(image);

            // set values:
            // page title name:
            document.title = `${name.toUpperCase()} | TandiseMehr`
            // hero content
            pageTitleDOM.textContent = `Home | ${name}`
            // image
            imgDOM.src = image
            titleDOM.textContent = name
            companyDOM.textContent = `by ${company}`
            // price (we use formatPrice function to fix price format)
            priceDOM.textContent = formatPrice(price)
            // descDOM.textContent = description

            // colors is array
            colors.forEach(color => {
                const span = document.createElement('span')
                span.classList.add('product-color')
                span.style.backgroundColor = `${color}`
                colorsDOM.appendChild(span)
            });
        }
        else{
            console.log(response.status, response.statusText);
            centerDOM.innerHTML = `
            <div>
            <h3 class='error'>sorry, something went wrong</h3>
            <a href="index.html" class='btn'>back home</a>
            </div>
            `
        }
    } catch (error) {
        // network error
        console.log(error);
    }
    
    // console.log(response);


    loading.style.display = 'none'
})

cartBtn.addEventListener('click', function(){
    addToCart(productID)
})