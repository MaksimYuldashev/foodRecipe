import { creatingIngredientsBlock } from "./creatingIngredientsBlock.js";

const favoritesBlockEl = document.querySelector('.favorites__block');
const favoritesIconEl = document.querySelector('.favorites__item-block');

let isEventAdded = false;

const foodCardsBlockEl = document.querySelector('.block__food-cards');

function addViewIngredientHandler(card, data) {
    const viewIngredientBtnEl = card.querySelector('.viewIngredient');
    viewIngredientBtnEl.addEventListener('click', e => {
        const mealId = e.target.dataset.mealId;
        const meal = data.meals.find(meal => meal.idMeal === mealId);
        creatingIngredientsBlock([meal])
        favoritesBlockEl.style.display = 'none';
    });
}


function addFavoritesDishes(data) {
    if (!isEventAdded) {
        foodCardsBlockEl.addEventListener('click', e => {
            const icon = e.target.closest('.favorites__icon');
            if (icon) {
                const card = icon.closest('.card__food');
                if (card) {
                    const clonedCard = card.cloneNode(true);
                    favoritesBlockEl.appendChild(clonedCard);

                    deleteCardFood(clonedCard);
                    addViewIngredientHandler(clonedCard, data)
                    updateStorage(clonedCard)
                }
            }
        });
        isEventAdded = true;
    }
}

let favoriteFood = JSON.parse(localStorage.getItem('favoriteFood')) || [];

function updateStorage(card) {
    let htmlCode = card.innerHTML;
    favoriteFood.push(htmlCode)
    localStorage.setItem('favoriteFood', JSON.stringify(favoriteFood));
}

function loadFoodLocalStorage() {
    let favoriteFood = JSON.parse(localStorage.getItem('favoriteFood')) || [];
    favoriteFood.forEach(htmlCode => {
        let cardFood = document.createElement('div');
        cardFood.classList.add('card__food');
        cardFood.innerHTML = htmlCode;
        favoritesBlockEl.appendChild(cardFood);
        deleteCardFood(cardFood);
    });
}

document.addEventListener('DOMContentLoaded', loadFoodLocalStorage)


function deleteCardFood(card) {
    const clonedIcon = card.querySelector('.favorites__icon');
    clonedIcon.innerHTML = `<i class='bx bx-x'></i>`;

    clonedIcon.addEventListener('click', () => {
        card.remove();

        const index = favoriteFood.indexOf(card.innerHTML);
        if (index !== -1) {
            favoriteFood.splice(index, 1);
        }

        localStorage.setItem('favoriteFood', JSON.stringify(favoriteFood));

        if (favoritesBlockEl.children.length === 0) {
            foodCardsBlockEl.style.display = 'grid';
            favoritesBlockEl.style.display = 'none';
        }
    });
}

function closeAndOpenFavoritesBlock() {
    if (favoritesBlockEl.style.display === 'none') {
        if(favoritesBlockEl.children.length === 0) {
            alert("You don't have any favorite dishes");
            return;
        }
        favoritesBlockEl.style.display = 'grid';
        foodCardsBlockEl.style.display = 'none';
    } else {
        foodCardsBlockEl.style.display = 'grid';
        favoritesBlockEl.style.display = 'none';
    }
}

favoritesIconEl.addEventListener('click', e => {
    closeAndOpenFavoritesBlock()
})


export { addFavoritesDishes }

