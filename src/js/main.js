'use strict';

//BURGER MENU

////DOM-elements
let header = document.querySelector('.header');
let burgerMenu = document.querySelector('.js-menu');
let openMenuBtn = document.querySelector('.js-burger');
let closeMenuBtn = burgerMenu.querySelector('.js-close');
/// classes
let visibilityClass = 'hidden';
/// funcrions
//functions
function openBurgerMenu(){
	let headerBox = header.getBoundingClientRect();
	let headerTop = headerBox.top;
	burgerMenu.style.top = headerTop + 'px';
	toggleMenu();
}

function toggleMenu(){
	burgerMenu.classList.toggle(visibilityClass);
}
///events
openMenuBtn.addEventListener('click', openBurgerMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
