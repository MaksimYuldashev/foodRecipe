import { getUser } from "./fetch.js";
import { handleData, setCurrentPage } from "./pagination.js";


const formEl = document.forms.searchFood;
const inputEl = formEl.searchFoodInput;
const btnMealEl = document.querySelector('#btnAllMeals');


formEl.addEventListener('submit', async e => {
    e.preventDefault();
    setCurrentPage(1)
    await showFood();
})

btnMealEl.addEventListener('click', e => {
    setCurrentPage(1)
    showFood()
})

async function showFood() {
    const inputVal = inputEl.value;
    const data = await getUser(inputVal);
    handleData(data);
}

export { showFood }

