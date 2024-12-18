var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 16,
  centeredSlides: false,

  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    590: {
      slidesPerView: 2,
    },
    930: {
      slidesPerView: 3, 
    },
    1210: {
      slidesPerView: 4,
    }
  }
});
