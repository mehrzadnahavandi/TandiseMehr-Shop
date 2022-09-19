import { getElement } from './utils.js';

const toggleNav = getElement(".toggle-nav");
const sidebarOvarlay = getElement('.sidebar-overlay');
const closeBtn = getElement(".sidebar-close");

toggleNav.addEventListener('click', ()=>{
    sidebarOvarlay.classList.add('show')
})

closeBtn.addEventListener('click', ()=>{
    sidebarOvarlay.classList.remove('show')
})
