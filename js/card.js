const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("../menu.json")
    .then((response) => response.json())
    .then((data) => {
        const cardData = data.LogosMenu
        const findCard = cardData.find(item => item.id == id)
        const card = document.querySelector(".card-container");
        console.log(findCard);
        if (findCard) {
            card.innerHTML = `<div class="card__content">
            <div class="card__title">
              <img src="../imgs/left-arrow.svg" alt="left arrow" />
              <a href="../index.html" class="card__title-item">Вернуться назад</a>
            </div>
            <div class="card__item">
              <img src="${findCard.imgUrl}" alt="photo of dish" class="card__item-img" />
              <div class="card__item-info">
                <h2 class="card__item-info-title">${findCard.name}</h2>
                <p class="card__item-info-description">${findCard.description}</p>
                <span class="card__item-info-weight">Вес: ${findCard.weight}</span>
                <div class="card__item-info-wrap">
                  <button class="card__item-info-btn header__btn">
                    Корзина
                    <div class="card__item-info-btn-line header__line"></div>
                    <img src="../imgs/shopping-bag.svg" alt="shopping bag" />
                  </button>
                  <h3 class="card__item-info-price">${findCard.price} ₽</h3>
                </div>
                <div class="card__item-info-bot">
                  <ul class="card__item-info-bot-name">
                    <li>Белки</li>
                    <li>Жиры</li>
                    <li>Углеводы</li>
                    <li>Ккал</li>
                    <li>Вес</li>
                  </ul>
                  <div class="card__item-info-bot-line"></div>
                  <ul class="card__item-info-bot-num">
                    <li>${findCard.protein}</li>
                    <li>${findCard.fat}</li>
                    <li>${findCard.carbohydrates}</li>
                    <li>${findCard.calories}</li>
                    <li>${findCard.weight}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>`
        }
    });