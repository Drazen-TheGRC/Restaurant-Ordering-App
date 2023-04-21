import { foodMenu } from "./data.js"
import { drinkMenu } from "./data.js"


function getFoodMenuHtml(){
    let foodHtml = ""

    foodMenu.forEach(function(product){

        let ingredientList = ""
        product.ingredients.forEach(function(ingredient){
            ingredientList += ingredient + ", "
        })
        ingredientList = ingredientList.substring(0, ingredientList.length-2)
        console.log(ingredientList)


        foodHtml +=
        `
        <section>
            <p class="emoji" role="img" aria-label="hamburger">${product.emoji}</p>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p>${ingredientList}</p>
                <h3>$${product.price}</h3>
            </div>

            <i class="add fa-solid fa-circle-plus"></i>

        </section>
        `
    })

    return foodHtml
}

function getDrinkMenuHtml(){
    let drinkHtml = ""

    drinkMenu.forEach(function(product){

        let ingredientList = ""
        product.ingredients.forEach(function(ingredient){
            ingredientList += ingredient + ", "
        })
        ingredientList = ingredientList.substring(0, ingredientList.length-2)
        console.log(ingredientList)


        drinkHtml +=
        `
        <section>
            <p class="emoji" role="img" aria-label="hamburger">${product.emoji}</p>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p>${ingredientList}</p>
                <h3>$${product.price}</h3>
            </div>

            <i class="add fa-solid fa-circle-plus"></i>

        </section>
        `
    })

    return drinkHtml
}

function render(html){
    document.getElementsByTagName("main")[0].innerHTML = html
}

render(getFoodMenuHtml())