'use strict'; //BURGER MENU
////DOM-elements

var header = document.querySelector('.header');
var burgerMenu = document.querySelector('.js-menu');
var openMenuBtn = document.querySelector('.js-burger');
var closeMenuBtn = burgerMenu.querySelector('.js-close'); /// classes

var visibilityClass = 'hidden'; /// funcrions
//functions

function openBurgerMenu() {
  var headerBox = header.getBoundingClientRect();
  var headerTop = headerBox.top + window.scrollY;
  burgerMenu.style.top = headerTop + 'px';
  toggleMenu();
}

function toggleMenu() {
  burgerMenu.classList.toggle(visibilityClass);
} ///events


openMenuBtn.addEventListener('click', openBurgerMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
  document.querySelector('.timeline__date--main').setAttribute("style", "color: #de2bba");
}