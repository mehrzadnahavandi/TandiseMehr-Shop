// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count')
const cartItemDOM = getElement('.cart-items')
const cartTotalDOM = getElement('.cart-total')

let cart = getStorageItem('cart')

export const addToCart = (id) => {
  // console.log(id);
  let item = cart.find((cartItem) => cartItem.id === id )
  // check if the item is in the cart
  if(!item){
    // add new item
    let product = findProduct(id)
    // console.log(product);
    // add item to the cart
    product = {...product, amount:1}
    cart = [...cart,product]
    // add item to DOM
    addToCartDOM(product)
    // console.log(cart);
    
  }
  else{
    // update values
    const amount = increaseAmount(id)
    const items = [...cartItemDOM.querySelectorAll('.cart-item-amount')]
    const newAmount = items.find((value) => value.dataset.id ===id)
    newAmount.textContent = amount
  }
  // add one to the item count
  displayCartItemCount()
  // display cart totals
  displayCartTotal()
  // set cart in local storage
  setStorageItem('cart', cart)
  // more stuff coming up
  openCart()
};


function displayCartItemCount(){
  // adding number to cart via reduce function
  const amount = cart.reduce((total,cartItem)=>{
    return total += cartItem.amount
  }, 0)
  cartItemCountDOM.textContent = amount
}

function displayCartTotal(){
  let total = cart.reduce((total,cartItem)=>{
    return total += cartItem.price * cartItem.amount
  }, 0)
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`
}



function displayCartItemsDOM(){
  cart.forEach((cartItem) =>{
    addToCartDOM(cartItem)
  })
}

function removeItem(id){
  cart = cart.filter((cartItem) => cartItem.id !== id)
}


function increaseAmount(id){
  let newAmount
  cart = cart.map((cartItem) => {
    if(cartItem.id === id){
      newAmount = cartItem.amount + 1
      cartItem = {...cartItem, amount: newAmount}
    }
    return cartItem
  })
  return newAmount
}

function decreaseAmount(id){
  let newAmount
  cart = cart.map((cartItem) => {
    if(cartItem.id === id){
      newAmount = cartItem.amount - 1
      cartItem = {...cartItem, amount:newAmount}
    }
    return cartItem
    
  })
  return newAmount
}



function setupCartFunctionality(){
  cartItemDOM.addEventListener('click', function (e) {
    const element = e.target;
    // console.log(element);
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
// remove
if(element.classList.contains('cart-item-remove-btn')){
  removeItem(id)
  // we remove the parent div contains all parts of item
  // element.parentElement.parentElement.remove() 
  // or:
  parent.parentElement.remove()
}
// increase
if(parent.classList.contains('cart-item-increase-btn')){
  console.log(parentID);
  const newAmount = increaseAmount(parentID)
  parent.nextElementSibling.textContent = newAmount
}
// decrease
if(parent.classList.contains('cart-item-decrease-btn')){
  console.log(parentID);
  const newAmount = decreaseAmount(parentID)
  if(newAmount === 0 ){
    removeItem(parentID)
    parent.parentElement.parentElement.remove()
  }
  else{
    parent.previousElementSibling.textContent = newAmount
  }
}
    displayCartItemCount()
    displayCartTotal()
    setStorageItem('cart', cart)
  })
}



// adding cart to all the pages
const init = () => {
  // console.log(cart);
  // display amount of cart items
  displayCartItemCount()
  // display total
  displayCartTotal()
  // add all cart items to the dom
  displayCartItemsDOM()
  // set up cart functionality
  setupCartFunctionality()
}

init()

