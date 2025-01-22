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

    function UpdateCounter() {
      const HeaderCounter = document.querySelector('.header__btn span');
      HeaderCounter.textContent = localDishes.length
    }
    UpdateCounter();

    function renderMenu(items, container) {
      container.innerHTML = "";
      items.forEach((item) => {
        container.innerHTML += ` 
                 <div class="cold__catalog-card swiper-slide">
                    <div class="cold__catalog-card-number">1</div>
                 <img src="${item.imgUrl}" class="cold__catalog-card-img" alt="img__name"/>
                <div class="cold__catalog-card-info">
                  <div class="cold__catalog-card-top">
                  <h3 class="cold__catalog-card-title">${item.name}</h3>
                  <span class="cold__catalog-card-weight">${item.weight}</span>
               </div>
              <p class="cold__catalog-card-description">
              ${item.description}
              </p>
              <div class="cold__catalog-card-bot"> 
              <div data-id=${item.id}  class="cold__catalog-card-minus">
                <img src="./imgs/minus.svg" alt="minus" />
               </div>
               <b class="cold__catalog-card-price">${item.price}₽</b>
              <div data-id=${item.id}  class="cold__catalog-card-plus">
                <img src="./imgs/plus.svg" alt="plus" />
               </div>
            <button data-id=${item.id} class="cold__catalog-card-btn">
                В корзину
                <img  class="btn__img" src="./imgs/Cart.svg" alt="" />
            </button>
        </div>
    </div>
</div>`;

        const BasketBtns = container.querySelectorAll('.cold__catalog-card-btn');
        BasketBtns.forEach(btn => {
          btn.addEventListener('click', function () {
            const ItemId = btn.getAttribute('data-id');
          })
        })

      });

    }
   

    function onClickCard() {
      const allCards = document.querySelectorAll(".cold__catalog-card");
      allCards.forEach((item) => {
        const addBtn = item.querySelector(".cold__catalog-card-btn");
        const dishId = addBtn.getAttribute("data-id");
        const findCard = menuDataArr.find((item) => item.id == dishId);
        const existDish = localDishes.find((item) => item.id === findCard.id);
        const cardCounter = item.querySelector(".cold__catalog-card-number");
        const minusBtn = item.querySelector(".cold__catalog-card-minus");
        const plusBtn = item.querySelector(".cold__catalog-card-plus");
        localStorage.setItem("dishes", JSON.stringify(localDishes));
        if (existDish) {
          cardCounter.classList.add("number-active");
          cardCounter.innerText = existDish.counter;
          item.classList.add("card-active");
          addBtn.style.display = "none";
          minusBtn.classList.add("new-active");
          plusBtn.classList.add("new-active");
        }
        addBtn.addEventListener("click", function () {
          localStorage.setItem("dishes", JSON.stringify(localDishes));
          cardCounter.style.display = "flex";
          minusBtn.style.display = "flex";
          plusBtn.style.display = "flex";
          addBtn.style.display = "none";
          if (existDish) {
            existDish.counter++;
            cardCounter.innerText = existDish.counter;
            cardCounter.classList.add("number-active");
            item.classList.add("card-active");
            minusBtn.classList.add("new-active");
            plusBtn.classList.add("new-active");
          } else {
            findCard.counter = 1;
            cardCounter.innerText = findCard.counter;
            cardCounter.classList.add("number-active");
            item.classList.add("card-active");
            minusBtn.classList.add("new-active");
            plusBtn.classList.add("new-active");
            localDishes.push(findCard);
          }
          localStorage.setItem("dishes", JSON.stringify(localDishes));
          UpdateCounter();


        });
        PlusCounter(plusBtn, cardCounter, findCard);
        MinusCounter(minusBtn, cardCounter, addBtn, plusBtn);
        UpdateCounter();
        
      });
    }
    
    function PlusCounter(plusBtn, cardCounter, findCard) {
      plusBtn.addEventListener('click', function () {
        const GetPlusId = plusBtn.getAttribute('data-id');
        const existingItem = localDishes.find(item => item.id == GetPlusId);
        if (existingItem) {
          existingItem.counter++;
          cardCounter.textContent = existingItem.counter;
        } else {
          findCard.counter = 1;
          localDishes.push(findCard);
          cardCounter.textContent = findCard.counter;
        }
        localStorage.setItem("dishes", JSON.stringify(localDishes));
        UpdateCounter();
      });
    }

    function MinusCounter(minusBtn, cardCounter, addBtn, plusBtn) {
      minusBtn.onclick = function () {
        const GetMinusId = minusBtn.getAttribute('data-id')
        localDishes.forEach(item => {
          if (item.id == GetMinusId) {
            if (item.counter > 0) {
              item.counter--;
              cardCounter.textContent = item.counter
              if (item.counter == 0) {
                cardCounter.style.display = "none";
                minusBtn.style.display = "none";
                plusBtn.style.display = "none";
                addBtn.style.display = "block";
                addBtn.style.width = "135px";
                addBtn.style.height = "44px";
                addBtn.style.display = "flex";
                addBtn.style.whiteSpace = "nowrap"
                const FindIndex = localDishes.findIndex(item => item.id == GetMinusId)
                localDishes.splice(Number(FindIndex), 1)


              }

            }

          }
        })
        localStorage.setItem("dishes", JSON.stringify(localDishes));
        UpdateCounter();
      }
    }


    let BasketCon
    const HeroSection = document.querySelector('.hero')
    const ColdSection = document.querySelector('.cold')
    const HotSection = document.querySelector('.hot')
    const MeatSection = document.querySelector('.meat')
    const AboutSection = document.querySelector('.about')
    const MapSection = document.querySelector('.map')
    const MainPart = document.querySelector('main')
    const WholeBody = document.querySelector('body')

    function ClickHeaderBtn() {
      const HeaderBtn = document.querySelector('.header__btn')
      HeaderBtn.addEventListener('click', function () {
        
        if (localDishes.length === 0) {
          function ShowEmptyBasket() {
            if (!document.querySelector('.empty-cart-content')) {
              const EmptyBasketElement = document.createElement('div');
              EmptyBasketElement.innerHTML = `
              <div class="empty-cart-content">
                  <div class="empty__container">
                      <img class="empty__icon" src="../imgs/delete__empty-cart.png" alt="delete__empty-cart">
                      <div class="empty__body"> 
                          <img src="../imgs/empty-cart.png" alt="cart-empty">
                          <h1 class="empty-cart-title">КОРЗИНА ПУСТАЯ</h1>
                          <button class="empty__btn">Посмотреть меню</button>
                      </div>
                  </div>
              </div>`;
              const Overlay = document.createElement('div');
              Overlay.style.position = "absolute";
              Overlay.style.top = "0";
              Overlay.style.left = "0";
              Overlay.style.width = "100%";
              Overlay.style.height = "3888px";
              Overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
              AboutSection.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
              Overlay.style.zIndex = "10";
              WholeBody.appendChild(Overlay);
              EmptyBasketElement.style.position = "absolute";
              EmptyBasketElement.style.top = "50%";
              EmptyBasketElement.style.left = "50%";
              EmptyBasketElement.style.transform = "translate(-50%, -50%)";
              EmptyBasketElement.style.width = "auto";
              EmptyBasketElement.style.height = "auto";
              EmptyBasketElement.style.display = "flex";
              EmptyBasketElement.style.alignItems = "center";
              EmptyBasketElement.style.justifyContent = "center";
              EmptyBasketElement.style.zIndex = "20";
              HeroSection.appendChild(EmptyBasketElement);
              Overlay.addEventListener('click', () => {
                Overlay.style.display = "none";
                EmptyBasketElement.remove();
              });
              EmptyBasketClick(EmptyBasketElement, Overlay)
            }

          }
          ShowEmptyBasket();
        }
        else {
          
          function RenderBasket() {
            HeroSection.style.display = "none";
            ColdSection.style.display = "none"
            HotSection.style.display = "none";
            MeatSection.style.display = "none";
            AboutSection.style.display = "none";
            MapSection.style.display = "none";
            HeroSection.style.backgroundImage = "none";
            HeroSection.style.height = "0px";
       
            function UpdateMain(){
              const allCards = document.querySelectorAll(".cold__catalog-card");
              allCards.forEach((item) => {
                const addBtn = item.querySelector(".cold__catalog-card-btn");
                const dishId = addBtn.getAttribute("data-id");
                const findCard = menuDataArr.find((item) => item.id == dishId);
                const existDish = localDishes.find((item) => item.id === findCard.id);
                const cardCounter = item.querySelector(".cold__catalog-card-number");
                const minusBtn = item.querySelector(".cold__catalog-card-minus");
                const plusBtn = item.querySelector(".cold__catalog-card-plus");
                if (existDish) {
                  addBtn.style.display = "none";
                  cardCounter.style.display = "flex";
                  minusBtn.style.display = "flex";
                  plusBtn.style.display = "flex";
                  cardCounter.innerText = existDish.counter;
                  cardCounter.classList.add("number-active");
                  item.classList.add("card-active");
                  minusBtn.classList.add("new-active");
                  plusBtn.classList.add("new-active");
                }
                else{
                  addBtn.style.display = "flex";
                  cardCounter.style.display = "none";
                  minusBtn.style.display = "none";
                  plusBtn.style.display = "none";
                 

                }
              })
            }
            if (!document.querySelector('.basket__con') || BasketCon.style.display == 'none') {
              BasketCon = document.createElement('div');
              BasketCon.classList.add('basket__con');
              BasketCon.style.display = "block";
              BasketCon.innerHTML = `
     <div class="basket__container">
         <div class="basket__header">
             <div class="header__above">
                 <img src="../imgs/basket__svg(1).svg" alt="arrow">
                 <p class="header__intro">к выбору блюда</p>
             </div>
             <div class="header__beneath">
                 <img src="../imgs/basket__svg(2).svg" alt="arrow2">
                 <h1 class="header__title">КОРЗИНА</h1>
                 <p class="header__counter">(в корзине <span></span> товара)</p>
             </div>
         </div>
         <div class="basket__content">
             <div class="basket__items"></div>
             <div class="basket__addition">ДОБАВИТЬ К ЗАКАЗУ</div>
             <div class="basket__recommendation"></div>
             <hr class="basket__line">
             <div class="basket__total">
                 <div class="total__info">
                     <p class="total__price">Итого: <span>500 ₽</span> </p>
                     <div class="total__del-wrap">
                     <p class="total__delivery">До бесплатной доставки не хватает:</p><span class="price_min"></span>
                     </div>
                     <p class="total__min-price">Минимальная сумма заказа 1500 ₽</p>
                 </div>
                 <div class="total__btn">
                     <button class="total__apply">Оформить заказ</button>
                 </div>
             </div>
         </div>
     </div>
   `;

              function UpdateCounterBack(BasketCon) {
                const CounterBack = BasketCon.querySelector(".header__counter span")
                CounterBack.textContent = localDishes.length
              }
              UpdateCounterBack(BasketCon);

              MainPart.appendChild(BasketCon);
              GoBackToMain(BasketCon);
              RenderBasketItems(BasketCon);
              RenderRec(BasketCon);
              ShowTotalPrice();
             

            }




            function RenderBasketItems(BasketCon) {
              const BasketItems = BasketCon.querySelector('.basket__items')
              localDishes.forEach(item => {
                BasketItems.innerHTML += `  <div class="basket__item">
                           <img class="basket__img" src="${item.imgUrl}" alt="basket__item">
                           <div class="basket__feature">
                           <div class="item__info">
                           <h2 class="item__title">${item.name}</h2>
                           <p class="item__description">${item.description}</p>
                           </div>
                           
                           <div class="basket__click">
                           <div class="item__counter">
                           <button data-id-basket=${item.id} class="item__minus">
                               <img src="../imgs/minus.svg" alt="minus__button">
                           </button>
                           <p class="item__number">${item.counter}</p>
                           <button data-id-basket=${item.id} class="item__plus">
                               <img src="../imgs/plus.svg" alt="plus__button">
                           </button>
                       </div>
                       <div data-id-basket=${item.id}  class="item__price">${item.price} ₽</div>
                       <button data-id-basket=${item.id}  class="item__remove">
                           <svg  width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <circle cx="19.7285" cy="19.0721" r="13.486" transform="rotate(45 19.7285 19.0721)" fill="#72A479"/>
                               <g clip-path="url(#clip0_69_466)">
                               <path d="M23.6035 21.1437L21.5311 19.0713L23.6035 16.999C24.1126 16.4898 24.1018 15.6455 23.5924 15.1361C23.0831 14.6268 22.2387 14.6159 21.7296 15.1251L19.6572 17.1974L17.5849 15.1251C17.0757 14.6159 16.2314 14.6268 15.722 15.1361C15.2127 15.6455 15.2018 16.4898 15.711 16.999L17.7833 19.0713L15.711 21.1437C15.2018 21.6528 15.2127 22.4972 15.722 23.0065C16.2314 23.5159 17.0757 23.5267 17.5849 23.0176L19.6572 20.9452L21.7296 23.0176C22.2387 23.5267 23.0831 23.5159 23.5924 23.0065C24.1018 22.4972 24.1126 21.6528 23.6035 21.1437Z" fill="white"/>
                               </g>
                               <defs>
                               <clipPath id="clip0_69_466">
                               <rect width="11.1304" height="11.1304" fill="white" transform="translate(19.6572 11.2009) rotate(45)"/>
                               </clipPath>
                               </defs>
                               </svg>                    
                       </button>
                           </div>
                           </div>
                   
                       </div>
                       <hr class="basket__line-item">
                       
                       </div>
             `;
                const basketImgs = BasketItems.querySelectorAll('.basket__img');
                basketImgs.forEach(img => {
                  img.style.height = "86px";
                  img.style.width = "117px"
                })
                const basketInfo = BasketItems.querySelectorAll('.item__info');
                basketInfo.forEach(info => {
                  info.style.width = "216px"
                })
              })
              plus(BasketItems);
              minus(BasketItems);
              Price(BasketItems);
              RemoveBasket(BasketItems);
              ShowTotalPrice();
            }

            function RenderRec(BasketCon) {
              const BasketREC = BasketCon.querySelector('.basket__recommendation');

              function updateRecommendations() {
                const ArrayForRec = menuDataArr
                  .filter(itemDis => !localDishes.some(itemC => itemDis.id === itemC.id))
                  .slice(0, 4);
                BasketREC.innerHTML = "";


                ArrayForRec.forEach(itemRec => {
                  BasketREC.innerHTML += `<div class="rec__split">
                    <div class="rec__cart">
                        <img class="rec__img" src="${itemRec.imgUrl}" alt="cart__img">
                        <div class="rec__info">
                            <h3 class="rec__title">${itemRec.name}</h3>
                            <div class="rec__puy">
                                <div class="rec__btn">
                                    <p class="rec__add-text"> Добавить</p>
                                    <button data-id-rec=${itemRec.id} class="rec__add">
                                        <img src="../imgs/plus.svg" alt="add__btn">
                                    </button>
                                </div>
                                <div class="rec__price">${itemRec.price} ₽</div>
                            </div>
                        </div>
                    </div>
                    <hr class="rec__line">
                </div>`;
                });


                const RecIMGS = BasketREC.querySelectorAll('.rec__img');
                RecIMGS.forEach(imgR => {
                  imgR.style.width = "150px";
                  imgR.style.height = "88px";
                });


                const AddNewBtns = BasketREC.querySelectorAll('.rec__add');
                AddNewBtns.forEach(btnRec => {
                  btnRec.addEventListener('click', function () {
                    const AdditemId = btnRec.getAttribute('data-id-rec');
                    const itemToAdd = ArrayForRec.find(item => item.id == AdditemId);
                    console.log(itemToAdd)
                      itemToAdd.counter = 1;
                      localDishes.push(itemToAdd);
                      localStorage.setItem('dishes', JSON.stringify(localDishes));
                      BasketCon.querySelector('.basket__items').innerHTML = "";
                      RenderBasketItems(BasketCon);
                      RenderBasket();
                      updateRecommendations();
                      UpdateCounter();
                      UpdateCounterBack(BasketCon);
                    UpdateMain();
                    
                   
                  });
                });
              }


              updateRecommendations();
              
             

            }

            function ShowTotalPrice() {
              const TotalPrice = document.querySelector('.total__price span')
              const TotalNum = localDishes.reduce((acc, item) => acc + item.price * item.counter, 0);
              TotalPrice.textContent = Number(TotalNum);
              const FreeDelivery = document.querySelector('.total__delivery')
              let Payment = document.querySelector('.price_min');
              if (TotalNum < 600) {
                Payment.textContent = 600 - TotalNum;
                FreeDelivery.style.display = "flex"
              }
              else {
                Payment.textContent = `Бесплатная доставка!`;
                FreeDelivery.style.display = "none"

              }
            }
            ShowTotalPrice();

            function plus(BasketItems) {
              const ItemPlusBtns = BasketItems.querySelectorAll('.item__plus');
              ItemPlusBtns.forEach(Pbtn => {
                Pbtn.addEventListener('click', function () {
                  const CountRender = Pbtn.closest('.item__counter');
                  const CountChild = CountRender.querySelector('.item__number');
                  const getId = Pbtn.getAttribute('data-id-basket');
                  const idNumber = Number(getId);
                  localDishes.forEach(item => {
                    if (idNumber === item.id) {
                      item.counter++;
                      CountChild.textContent = item.counter
                      Price(BasketItems);
                      ShowTotalPrice();
                     
                    }

                  });
                  localStorage.setItem("dishes", JSON.stringify(localDishes));
                  UpdateMain()
                });

              })
            }

            function minus(BasketItems) {
              const ItemMinusBtns = BasketItems.querySelectorAll('.item__minus');
              ItemMinusBtns.forEach(Pbtn => {
                Pbtn.addEventListener('click', function () {
                  const CountRender = Pbtn.closest('.item__counter');
                  const CountChild = CountRender.querySelector('.item__number');
                  const getId = Pbtn.getAttribute('data-id-basket');
                  const idNumber = Number(getId);
                  localDishes.forEach(item => {
                    if (idNumber === item.id && item.counter > 1) {
                      item.counter--;
                      CountChild.textContent = item.counter
                      Price(BasketItems);
                      ShowTotalPrice();
                      
                    }

                  });
                  localStorage.setItem("dishes", JSON.stringify(localDishes));
                  UpdateMain()

                });

              })
            }

            function Price(BasketItems) {
              const ItemPrice = BasketItems.querySelectorAll('.item__price')
              ItemPrice.forEach(price => {
                const getId = price.getAttribute('data-id-basket');
                localDishes.forEach(item => {
                  if (item.id == getId) {
                    price.textContent = `${item.counter * item.price}`
                  }
                })
              })
            }


            function RemoveBasket(BasketItems) {
              const RemoveBtns = BasketItems.querySelectorAll('.item__remove');
              RemoveBtns.forEach(btnRem => {
                btnRem.addEventListener('click', function () {
                  const getId = btnRem.getAttribute('data-id-basket')
                  const IdinNum = Number(getId)
                  const itemIndex = localDishes.findIndex(item => item.id == IdinNum)
                  localDishes.splice(itemIndex, 1)
                  localStorage.setItem("dishes", JSON.stringify(localDishes));
                  const BasketItemForRemove = btnRem.closest('.basket__item')
                  BasketItemForRemove.remove();
                  UpdateMain()
                  ShowTotalPrice();
                  UpdateCounter();
                  RenderBasket();
                  UpdateCounterBack(BasketCon);
                 
                })


              })
            }


            // window.location.reload()


          }
          RenderBasket();

        }

      });
    }
    ClickHeaderBtn();

    function EmptyBasketClick(EmptyBasketElement, Overlay) {

      const EmptyDelete = document.querySelector('.empty__icon')
      const ShowMenuBtn = document.querySelector('.empty__btn')
      EmptyDelete.addEventListener('click', function () {
        EmptyBasketElement.remove();
        Overlay.style.display = "none";

      })
      ShowMenuBtn.addEventListener('click', function () {
        EmptyBasketElement.remove();
        Overlay.style.display = "none";

      })





    }

    function GoBackToMain(BasketCon) {
      const BtnGoBack = BasketCon.querySelector('.header__intro');
      BtnGoBack.addEventListener('click', function () {
        localStorage.setItem("dishes", JSON.stringify(localDishes));
        HeroSection.style.display = "block";
        ColdSection.style.display = "block"
        HotSection.style.display = "block";
        MeatSection.style.display = "block";
        AboutSection.style.display = "block";
        MapSection.style.display = "block";
        HeroSection.style.backgroundImage = "url('../imgs/heroimage.jpg')";
        HeroSection.style.height = "484px";
        BasketCon.style.display = "none";

      })
     
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

        titleCategory.textContent = selectadCategory;
        const filteredData = menuDataArr.filter(item => item.category === selectadCategory);
        renderMenu(filteredData, contentCold)
      })
    })

  })


  .catch((error) => {
    console.error("Ошибка при получении данных:", error);
  });









