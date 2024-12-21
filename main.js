const localDishes = JSON.parse(localStorage.getItem("dishes")) || [];

fetch("./menu.json")
  .then((response) => response.json())
  .then((menuData) => {
    const menuDataArr = menuData.LogosMenu;
    const contentCold = document.querySelector(".cold__dishes");
    const contentHot = document.querySelector(".hot__dishes");
    const contentMeat = document.querySelector(".meat__dishes");
    console.log(localDishes);

    function onClickCard() {
      const allCards = document.querySelectorAll(".cold__catalog-card");

      allCards.forEach((item) => {
        const addBtn = item.querySelector(".cold__catalog-card-btn");

        addBtn.addEventListener("click", function () {
          const dishId = addBtn.getAttribute("data-id");
          const findCard = menuDataArr.find((item) => item.id == dishId);
          const existDish = localDishes.find((item) => item.id === findCard.id);

          if (existDish) {
            existDish.counter++;
          } else {
            findCard.counter = 1;
            localDishes.push(findCard);
          }
          localStorage.setItem("dishes", JSON.stringify(localDishes))
        });
      });
    }

    async function renderMenu(items, container) {
      container.innerHTML = "";

      await items.forEach((item) => {
        container.innerHTML += ` 
                 <div class="cold__catalog-card swiper-slide">
                 <div class="cold__catalog-card-number">${item.counter}</div>
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
               <b class="cold__catalog-card-price">${item.price}</b>
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
  })

  .catch((error) => {
    console.error("Ошибка при получении данных:", error);
  });
