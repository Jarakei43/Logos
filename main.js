fetch("./menu.json")
    .then(response => response.json())
    .then(menuData => {
        const contentCold = document.querySelector('.cold__dishes');
        const contentHot = document.querySelector('.hot__dishes');
        const contentMeat = document.querySelector('.meat__dishes');
        console.log(menuData);

        function renderMenu(items, container) {
            // console.log(m);
            container.innerHTML = '';

           items.forEach((item) => {
                container.innerHTML += ` 
                 <div class="cold__catalog-card swiper-slide">
                 <div class="cold__catalog-card-number">${item.counter}</div>
                 <imgпш
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
            <button class="cold__catalog-card-btn">
                В корзину
                <img src="./imgs/Cart.svg" alt="" />
            </button>
        </div>
    </div>
</div>`;

            });
        }
        const allData = menuData.LogosMenu;
        const coldDishes = allData.filter(item=>["Холодные закуски", "Супы"].includes(item.category));
        const hotDishes = allData.filter(item=>["Горячие закуски", "Рыбные блюда","Фирменные блюда"].includes(item.category));
        const meatDishes = allData.filter(item=>["Мясные блюда", "Гриль меню"].includes(item.category));

        // renderMenu(menuData, contentCold);
        renderMenu(coldDishes, contentCold); // Холодные блюда
        renderMenu(hotDishes, contentHot);  // Горячие блюда
        renderMenu(meatDishes, contentMeat); // Мясные блюда
    })

    .catch((error) => {
        console.error("Ошибка при получении данных:", error);
    });
