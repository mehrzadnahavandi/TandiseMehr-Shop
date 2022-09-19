

const allProductsUrl = 'https://course-api.com/javascript-store-products'
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  'https://course-api.com/javascript-store-single-product'

  // 'https://course-api.netlify.app/api/javascript-store-single-product'

const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}


// a function to change all the prices from cent to correct format
const formatPrice = (price) => {
  let formatedprice = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
  }).format((price / 100).toFixed(2))
  return formatedprice
}

const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item)
  if(storageItem){
    storageItem = JSON.parse(localStorage.getItem(item))
  }
  else{
    storageItem = []
  }
  return storageItem
}


// using local storage: localStorage is a property that allows JavaScript sites and apps to save key-value pairs in a web browser with no expiration date. This means the data stored in the browser will persist even after the browser window is closed
const setStorageItem = (name,item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}
