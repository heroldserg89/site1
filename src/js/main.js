import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';
import { disableScroll } from './functions/disable-scroll';
import { enableScroll } from './functions/enable-scroll';
import noUiSlider from 'nouislider';
import { Tabs, Modal } from 'bootstrap';
import Choices from 'choices.js';

import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs]);
// const swiperBlock = document.querySelector('.swiper');
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  // centeredSlides: true,
  spaceBetween: 30,
  // loop: true,
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletElement: 'button'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const btns = document.querySelectorAll('[data-offcanvas]');
btns.forEach((el) => {
  el.addEventListener('click', function (e) {
    disableScroll();
    let path = e.currentTarget.dataset.offcanvas;
    let target = document.querySelector(`[data-offcanvas-target="${path}"]`);
    let overlay = target.querySelector('.offcanvas__overlay');
    let wrapper = target.querySelector('.offcanvas__wrapper');
    let offcanvasCloseBtn = target.querySelector('.offcanvas__close');
    // let offcanvasSubAll = target.querySelectorAll('.offcanvas--sub');
    let offcanvasOpen = target.querySelectorAll('.offcanvas__wrapper');
    overlay.classList.add('offcanvas__overlay--open');
    wrapper.classList.add('offcanvas__wrapper--open');

    offcanvasCloseBtn.addEventListener('click', function (e) {
      overlay.classList.remove('offcanvas__overlay--open');
      offcanvasOpen.forEach((el) => {
        el.classList.remove('offcanvas__wrapper--open');
      });
      enableScroll();
    });

    overlay.addEventListener('click', function (e) {
      overlay.classList.remove('offcanvas__overlay--open');
      offcanvasOpen.forEach((el) => {
        el.classList.remove('offcanvas__wrapper--open');
      });
      enableScroll();
    });
  })
});

const offcanvasAll = document.querySelectorAll('.offcanvas');
offcanvasAll.forEach((el) => {
  if (el.classList.contains('offcanvas--sub')) {
    let offcanvasLink = el.querySelector('.offcanvas__link');
    let offcanvasSub = el.querySelector('.offcanvas__wrapper');
    let offcanvasTitle = el.querySelector('.offcanvas__title');
    let offcanvasHeaderTitle = el.querySelector('.offcanvas__header-title');
    let offcanvasBackBtn = el.querySelector('.offcanvas__back');
    offcanvasLink.addEventListener('click', function (e) {
      e.preventDefault();
      const currentTarget = e.currentTarget;
      if (!currentTarget.classList.contains('offcanvas__link--open')) {
        currentTarget.classList.add('offcanvas__link--open');
        offcanvasSub.style.maxHeight = `${offcanvasSub.scrollHeight + 16}px`
      } else {
        currentTarget.classList.remove('offcanvas__link--open');
        offcanvasSub.style.maxHeight = '';
      };
      let offcanvasText = offcanvasTitle.textContent;
      offcanvasHeaderTitle.textContent = offcanvasText;
      offcanvasSub.classList.toggle('offcanvas__wrapper--open');
    });

    offcanvasBackBtn.addEventListener('click', () => {
      offcanvasSub.classList.remove('offcanvas__wrapper--open');
    });
  }
})

const sliderPrice = document.querySelectorAll('.filter-price');
sliderPrice.forEach((el) => {
  let filterSlider = el.querySelector('.filter-price__slider-price');
  let rangeMin = parseInt(filterSlider.dataset.min);
  let rangeMax = parseInt(filterSlider.dataset.max);
  let step = parseInt(filterSlider.dataset.step);
  let filterInputs = el.querySelectorAll('.filter-price__input');
  noUiSlider.create(filterSlider, {
    start: [rangeMin, rangeMax],
    connect: true,
    step: step,
    range: {
      'min': rangeMin,
      'max': rangeMax
    }
  });
  filterSlider.noUiSlider.on('update', function (values, handle) {
    filterInputs[handle].value = Math.round(values[handle]);
  });

  filterInputs.forEach((input, indexInput) => {
    input.addEventListener('change', () => {
      filterSlider.noUiSlider.setHandle(indexInput, input.value);
    })
  });
})

// const testBtn = document.querySelector('.test');
// const input = document.querySelector('[value="2"]');
// console.log(input)
// testBtn.addEventListener('click', function(e){
//   input.checked = false;
// })
const slideProduct = document.querySelector('.slider-product');
if (slideProduct) {
  const sectionSliderProducts = document.querySelector('.section-products');
  const slideControl = sectionSliderProducts.querySelector('.swiper-control');
  const slideBtnNext = slideControl.querySelector('.swiper-button-next');
  const slideBtnPrev = slideControl.querySelector('.swiper-button-prev');
  const sliderProduct = new Swiper(slideProduct, {
    slidesPerView: 'auto',
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
      nextEl: slideBtnNext,
      prevEl: slideBtnPrev,
    },
  });
  function slideBtn() {
    let slideProductBtnCount = slideControl.querySelectorAll('.swiper-button-disabled').length;
    if (slideProductBtnCount == 2) {
      slideControl.style.display = 'none';
    } else {
      slideControl.removeAttribute('style');
    }
  }
  slideBtn();
  window.addEventListener('resize', () => {
    slideBtn()
  })
}

var sliderGalleryThumbs = new Swiper(".gallery__thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true
});
var sliderGalleryTop = new Swiper(".gallery__top", {
  spaceBetween: 10,
  thumbs: {
    swiper: sliderGalleryThumbs
  }
});

const choicesElements = document.querySelectorAll('.js-choice');
choicesElements.forEach((el) => {
  const choices = new Choices('.js-choice', {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
});

const cartList = document.querySelector('.cart__list');
const cartItem = cartList.querySelectorAll('.cart__item')
cartItem.forEach((el) => {
  const cartBobus = el.querySelector('.cart-item__bonus');
  const cartTitle = el.querySelector('.cart-item__title');
  if (window.innerWidth >= 992) {
    cartTitle.after(cartBobus);
  }
  const cartBtnDelete = el.querySelector('.cart-item__btn-delete');
  cartBtnDelete.addEventListener('click', () => {
    el.remove();
  })
})

const productCounter = document.querySelectorAll('.cart-item__counter');
productCounter.forEach((el) => {
  const btnPlus = el.querySelector('.cart-item__counter-btn--plus');
  const btnMinus = el.querySelector('.cart-item__counter-btn--minus');
  const counterInput = el.querySelector('.cart-item__counter-input')
  btnPlus.addEventListener('click', () => {
    counterInput.value++;
    if (counterInput.value > 1) {
      btnMinus.removeAttribute('disabled')
    }
  })
  if (counterInput.value <= 1) {
    btnMinus.disabled = true;
  }
  btnMinus.addEventListener('click', () => {
    if (counterInput.value == 2) {
      counterInput.value--;
      btnMinus.disabled = true;
    }

    if (counterInput.value > 2) {
      counterInput.value--;
    }
  })
})
