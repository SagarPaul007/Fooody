let btn = document.querySelector(".btn");

window.addEventListener("DOMContentLoaded", () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data => {
        let meal = data.meals[0];
        console.log(meal);

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

btn.addEventListener("click", () => {
    console.log("hello");
});