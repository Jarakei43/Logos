const localDishes = JSON.parse(localStorage.getItem("dishes")) || [];

fetch("./menu.json")
  .then((response) => response.json())
  .then((menuData) => {
    const menuDataArr = menuData.LogosMenu;
    const contentCold = document.querySelector(".cold__dishes");
    const contentHot = document.querySelector(".hot__dishes");
    const contentMeat = document.querySelector(".meat__dishes");
    console.log(localDishes);
    const spanFilter = document.querySelectorAll(".nav__list-item");
    console.log(spanFilter);
    const titleCategory = document.querySelector(".cold__title-item");
    console.log(titleCategory);

    function onClickCard() {
      const allCards = document.querySelectorAll(".cold__catalog-card");

      allCards.forEach((item) => {
        const addBtn = item.querySelector(".cold__catalog-card-btn");

        addBtn.addEventListener("click", function () {
          const dishId = addBtn.getAttribute("data-id");
          const findCard = menuDataArr.find((item) => item.id == dishId);
          const existDish = localDishes.find((item) => item.id === findCard.id);
          const cardCounter = item.querySelector(".cold__catalog-card-number");
          const minusBtn = item.querySelector(".cold__catalog-card-minus");
          const plusBtn = item.querySelector(".cold__catalog-card-plus");

          if (existDish) {
            existDish.counter++;
            cardCounter.innerText = existDish.counter;
          } else {
            findCard.counter = 1;
            cardCounter.classList.add("number-active");
            item.classList.add("card-active");
            addBtn.style.display = "none";
            minusBtn.classList.add("new-active");
            plusBtn.classList.add("new-active");
            localDishes.push(findCard);
          }
          localStorage.setItem("dishes", JSON.stringify(localDishes));
        });
      });
    }

    function renderMenu(items, container) {
      container.innerHTML = "";

      items.forEach((item) => {
        container.innerHTML += ` 
                 <div class="cold__catalog-card swiper-slide">
                    <div class="cold__catalog-card-number">1</div>
                 <img
                 src="${item.imgUrl}"
                  alt=""
                class="cold__catalog-card-img"
                 />
                <div class="cold__catalog-card-info">
                  <div class="cold__catalog-card-top">
                  <h3 class="cold__catalog-card-title">${item.name}</h3>
                  <span class="cold__catalog-card-weight">${item.weight}</span>
               </div>
              <p class="cold__catalog-card-description">
              ${item.description}
              </p>
              <div class="cold__catalog-card-bot"> 
              <div class="cold__catalog-card-minus">
                <img src="./imgs/minus.svg" alt="minus" />
               </div>
               <b class="cold__catalog-card-price">${item.price}₽</b>
              <div class="cold__catalog-card-plus">
                <img src="./imgs/plus.svg" alt="plus" />
               </div>
            <button data-id=${item.id} class="cold__catalog-card-btn">
                В корзину
                <img src="./imgs/Cart.svg" alt="" />
            </button>
        </div>
    </div>
</div>`;
      });
    }
    const coldDishes = menuDataArr.filter((item) =>
      ["Холодные закуски", "Супы"].includes(item.category)
    );
    const hotDishes = menuDataArr.filter((item) =>
      ["Горячие закуски", "Рыбные блюда", "Фирменные блюда"].includes(
        item.category
      )
    );
    const meatDishes = menuDataArr.filter((item) =>
      ["Мясные блюда", "Гриль меню"].includes(item.category)
    );

    renderMenu(coldDishes, contentCold);
    renderMenu(hotDishes, contentHot);
    renderMenu(meatDishes, contentMeat);
    onClickCard();
    spanFilter.forEach(span => {
        span.addEventListener('click', () => {
            const selectadCategory = span.getAttribute('data-category');
            console.log("выбрана категория:", selectadCategory);
            
            titleCategory.textContent = selectadCategory;
            const filteredData = menuDataArr.filter(item => item.category === selectadCategory);
            renderMenu(filteredData, contentCold)
        })
    })
  })

  .catch((error) => {
    console.error("Ошибка при получении данных:", error);
  });
