const localDishes = JSON.parse(localStorage.getItem("dishes")) || [];

fetch("./menu.json")
  .then((response) => response.json())
  .then((menuData) => {
    const menuDataArr = menuData.LogosMenu;
    const contentCold = document.querySelector(".cold__dishes");
    const contentHot = document.querySelector(".hot__dishes");
    const contentMeat = document.querySelector(".meat__dishes");
    const spanFilter = document.querySelectorAll(".nav__list-item");
    const titleCategory = document.querySelector(".cold__title-item");

    function onClickCard() {
      const allCards = document.querySelectorAll(".cold__catalog-card");

      allCards.forEach((item) => {
        const addBtn = item.querySelector(".cold__catalog-card-btn");
        const dishId = addBtn.getAttribute("data-id");
        
        addBtn.addEventListener("click", function () {
          const findCard = menuDataArr.find((item) => item.id == dishId);
          const cardCounter = item.querySelector(".cold__catalog-card-number");
          const minusBtn = item.querySelector(".cold__catalog-card-minus");
          const plusBtn = item.querySelector(".cold__catalog-card-plus");
          const existDish = localDishes.find((item) => item.id === findCard.id);

          function btnCounter() {
            findCard.counter = 1;
            cardCounter.classList.add("number-active");
            item.classList.add("card-active");
            addBtn.style.display = "none";
            minusBtn.classList.add("new-active");
            plusBtn.classList.add("new-active");
            function updateStorage() {
              localStorage.setItem("dishes", JSON.stringify(localDishes));
            }

            plusBtn.addEventListener("click", function () {
              findCard.counter++;
              cardCounter.innerText = findCard.counter;
              updateStorage();
            });
            minusBtn.addEventListener("click", function () {
              findCard.counter--;
              cardCounter.innerText = findCard.counter;
              if (findCard.counter <= 0) {
                item.classList.remove("card-active");
                minusBtn.classList.remove("new-active");
                plusBtn.classList.remove("new-active");
                addBtn.style.display = "flex";
                cardCounter.classList.remove("number-active");

                const index = localDishes.indexOf(findCard);
                if (index !== -1) localDishes.splice(index, 1);
              }
              updateStorage();
            });
            localDishes.push(findCard);
            updateStorage();
          }
          btnCounter();
        });
      });
    }
    function renderDishes() {
      localDishes.forEach((savedDish) => {
          const card = document.querySelector(`.cold__catalog-card-btn[data-id="${savedDish.id}"]`).closest(".cold__catalog-card");
  
          if (card) {
              const addBtn = card.querySelector(".cold__catalog-card-btn");
              const cardCounter = card.querySelector(".cold__catalog-card-number");
              const minusBtn = card.querySelector(".cold__catalog-card-minus");
              const plusBtn = card.querySelector(".cold__catalog-card-plus");
  
              cardCounter.innerText = savedDish.counter;
              cardCounter.classList.add("number-active");
              card.classList.add("card-active");
              addBtn.style.display = "none";
              minusBtn.classList.add("new-active");
              plusBtn.classList.add("new-active");
  
              plusBtn.addEventListener("click", function () {
                  savedDish.counter++;
                  cardCounter.innerText = savedDish.counter;
                  localStorage.setItem("dishes", JSON.stringify(localDishes));
              });
  
              minusBtn.addEventListener("click", function () {
                  savedDish.counter--;
                  cardCounter.innerText = savedDish.counter;
  
                  if (savedDish.counter <= 0) {
                      card.classList.remove("card-active");
                      minusBtn.classList.remove("new-active");
                      plusBtn.classList.remove("new-active");
                      addBtn.style.display = "flex";
                      cardCounter.classList.remove("number-active");
  
                      const index = localDishes.indexOf(savedDish);
                      if (index !== -1) localDishes.splice(index, 1);
                  }
  
                  localStorage.setItem("dishes", JSON.stringify(localDishes));
              });
          }
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
            <button data-id="${item.id}" class="cold__catalog-card-btn">
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
    renderDishes()
    onClickCard();
    spanFilter.forEach((span) => {
      span.addEventListener("click", () => {
        const selectadCategory = span.getAttribute("data-category");
        console.log("выбрана категория:", selectadCategory);

        titleCategory.textContent = selectadCategory;
        const filteredData = menuDataArr.filter(
          (item) => item.category === selectadCategory
        );
        renderMenu(filteredData, contentCold);
      });
    });
  })

  .catch((error) => {
    console.error("Ошибка при получении данных:", error);
  });
