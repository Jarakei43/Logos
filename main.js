fetch("./menu.json")
    .then(response => response.json())
    .then(menuData => {
        const contentCold = document.querySelector('.cold__dishes');
        const titleCategory = document.querySelector('.cold__title-item');
        const categoryHot = document.querySelector('.hot__content');
        categoryHot.style.display = 'none';
        const categoryMeat = document.querySelector('.meat__content');
        categoryMeat.style.display = 'none';
        function renderMenu(items, container) {
            container.innerHTML = '';
            items.forEach((item) => {
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
        const coldDishes = allData.filter(item => ["Холодные закуски", "Супы"].includes(item.category));
        renderMenu(coldDishes, contentCold);
        const spanFilter = document.querySelectorAll(".nav__list-item")
        const filterSpan = document.querySelectorAll('.nav__acc');
        filterSpan[0].classList.add("active-span")
        filterSpan.forEach((item) => {
            item.addEventListener("click", () => {
                event.preventDefault()
                
                filterSpan.forEach(item => item.classList.remove("active-span"))
                item.classList.add("active-span")
            })
        })
        spanFilter.forEach((span) => {
            let selectadCategory = "Холодные закуски";
            span.addEventListener('click', (event) => {
                event.preventDefault()
                selectadCategory = span.getAttribute('data-category');
                console.log("выбрана категория:", selectadCategory);
                titleCategory.textContent = selectadCategory;
                const filteredData = allData.filter(item => item.category === selectadCategory);
                renderMenu(filteredData, contentCold)
            })
            console.log("выбрана категория:", selectadCategory);
        })
    })
    .catch((error) => {
        console.error("Ошибка при получении данных:", error);
    });
