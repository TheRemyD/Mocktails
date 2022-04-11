let drinkList = {};
let userDrink;


function getNonAlcoholicDrinksList() {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        let drinkList = {};
        data.drinks.map((drink) => drinkList[drink.strDrink] = drink.idDrink);
        getInput(drinkList);
    })
    .catch((error) => console.log(error));
}

function getInput(drinks) {
    drinkList = drinks;
    document.querySelector(".card__bottom--get-recipe").addEventListener("click", getUserChoice);
    document.querySelector(".card__bottom--get-random").addEventListener("click", getRandom);
}

function getUserChoice() {
    let userChoice = document.querySelector(".card__bottom--input").value,
        userChoiceID = drinkList[userChoice];

    clearRecipe();
    getRecipe(userChoiceID);
}

function getRandom() {
    clearRecipe();
    let drinkArr = Object.keys(drinkList),
        randomDrink = drinkArr[Math.floor(Math.random() * drinkArr.length)],
        randomDrinkID = drinkList[randomDrink];

    getRecipe(randomDrinkID);
}

function getRecipe(drinkID) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            showDrink(data.drinks[0]);
        })
        .catch((error) => console.log(error));
}

function showDrink(drink) {
    userDrink = drink;
    document.querySelector(".card__bottom--input").value = userDrink.strDrink;
    document.querySelector(".card__top--image").src = userDrink.strDrinkThumb;
    createIngredientList();
    document.querySelector(".recipe__info--instructions").innerText = userDrink.strInstructions;
}

function createIngredientList() {
    for (let i = 1; i <= 15; i++) {
        if (userDrink[`strIngredient${i}`] !== null) {
            let ingredient = document.createElement("li");

            if (userDrink[`strMeasure${i}`] === null) {
                ingredient.innerText = `${userDrink[`strIngredient${i}`]}`;
            } else {
                ingredient.innerText = `${userDrink[`strMeasure${i}`]} - ${
                    userDrink[`strIngredient${i}`]
                }`;
            }
            document.querySelector(".recipe__info--ingredients").appendChild(ingredient);
        }
    }
}

function clearRecipe() {
    document.querySelector(".card__bottom--input").value = "";
    document.querySelector(".recipe__info--ingredients").innerHTML = "";
    document.querySelector(".recipe__info--instructions").innerText = "";
    document.querySelector(".card__top--image").src = "../images/bar.jpg";
}

clearRecipe();
getNonAlcoholicDrinksList();