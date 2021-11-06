let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    header__menu.classList.remove('active');
}

// let cart = document.querySelector('.shopping-card');

// document.querySelector('#cart-btn').onclick = () =>{
//     cart.classList.toggle('active');
//     searchForm.classList.remove('active');
//     loginForm.classList.remove('active');
//     header__menu.classList.remove('active');
// }

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    header__menu.classList.remove('active');
}


let header__menu = document.querySelector('.header__menu');

document.querySelector('#menu-btn').onclick = () =>{
    header__menu.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    header__menu.classList.remove('active');
}