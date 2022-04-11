// (function(){
//   const burger = document?.querySelector('[data-burger]');
//   const menu = document?.querySelector('[data-menu]');

//   burger?.addEventListener('click', (e) => {
//     burger?.classList.toggle('burger--active');
//     menu?.classList.toggle('menu--active');
//   });
// })();
//burger-menu
let burger = document.querySelector('.main-header__toggle');
let menu = document.querySelector('.menu-header');

burger.onclick = function () {
  let burgerOpen = document.querySelector('.main-header__toggle--open');
  if (burgerOpen) {
    burger.classList.remove('main-header__toggle--open');
    menu.classList.remove('menu-header--open');
    burger.setAttribute("aria-label", "Открыть меню");
  } else {
    burger.classList.add('main-header__toggle--open');
    menu.classList.add('menu-header--open');
    burger.setAttribute("aria-label", "Закрыть меню");
  }
};
