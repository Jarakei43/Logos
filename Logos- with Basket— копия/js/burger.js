const openBurger = document.querySelector(".header__burger");
const closeBurger = document.querySelector(".modal__close")
const modal = document.querySelector(".modal");

openBurger.addEventListener("click", function () {
  modal.style.display = "block";
});

closeBurger.addEventListener("click", function () {
  modal.style.display = "none";
});