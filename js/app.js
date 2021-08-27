let btnTop = document.querySelector(".btn-top");
let btnBottom = document.querySelector(".btn-bottom");
let searchTop = document.querySelector(".search-top");
let searchBottom = document.querySelector(".search-bottom");
let result = document.querySelector(".result");


// functions

function showRecipe(data, s) {
    let meals = data.meals;
    if (!meals) {
        alert(`Ooops... No Results found for "${s}", You may have misspelled the dish name or Our database dosen't have the recipe for this dish rn!`);
        return;
    }

    document.querySelector(".random-recipe").innerHTML = `Search Result for "${s}"`;
    document.getElementById("random").scrollIntoView();

    let x = "";

    meals.forEach(meal => {

        let {
            strMeal,
            strArea,
            strInstructions
        } = meal;

        let ingredients = [];
        let arr;

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`);
        }
        for (let i = 0; i < 20; i++) {
            arr = ingredients.map(ing => `<div class="item">${ing}</div>`);
        }
        arr.forEach(item => {
            document.querySelector(".ingridients").innerHTML += item;
        });

        x += `<div class="recipe">
                    <div class="introduction">
                        <h3 class="name">${strMeal}</h3>
                        <p class="area">${strArea}</p>
                    </div>

                    <div class="ingridients">${arr.join(" ")}</div>

                    <div class="instruction">
                        <p>${strInstructions}</p>
                    </div>
                </div>`;
    });

    result.innerHTML = x;

}

// events

window.addEventListener("DOMContentLoaded", () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data => {
        let meal = data.meals[0];
        let {
            strMeal,
            strArea,
            strInstructions
        } = data.meals[0];

        let ingredients = [];
        let arr;

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`);
        }
        for (let i = 0; i < 20; i++) {
            arr = ingredients.map(ing => `<div class="item">${ing}</div>`);
        }

        document.querySelector(".name").innerHTML = strMeal;
        document.querySelector(".area").innerHTML = strArea;
        arr.forEach(item => {
            document.querySelector(".ingridients").innerHTML += item;
        });
        document.querySelector(".instruction").innerHTML = strInstructions;
    });
});

btnTop.addEventListener("click", (e) => {
    e.preventDefault();
    let s = searchTop.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`).then(res => res.json()).then(data => showRecipe(data, s));
});
btnBottom.addEventListener("click", (e) => {
    e.preventDefault();
    let s = searchBottom.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`).then(res => res.json()).then(data => showRecipe(data, s));
});