import { foodMenu } from "./data.js"
import { drinkMenu } from "./data.js"

let isFood = true
let menu
let cartHtml = ""

document.addEventListener("click", function(e){

    if(e.target.id){
        if(isFood){
            addToCart(e.target.dataset.product_type, e.target.id)
        }else{
            
        }
        addToCart()
    }
})

function getProductHtml(){

    let productHtml = ""
    
    let productType
    if(isFood){
        menu = foodMenu
        productType = "food"
    }else{
        menu = drinkMenu
        productType = "drink"
    }

    menu.forEach(function(product){

        // List of ingredient
        let ingredientList = ""
        product.ingredients.forEach(function(ingredient){
            ingredientList += ingredient + ", "
        })
        ingredientList = ingredientList.substring(0, ingredientList.length-2)
        console.log("Product: " + product.name + ". Ingredients: " + ingredientList)
        console.log(product.id)

        productHtml +=
        `
        <section>
            <p class="emoji" role="img" aria-label="${product.name}">${product.emoji}</p>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p>${ingredientList}</p>
                <h3>$${product.price}</h3>
            </div>

            <i id="${product.id}" class="add fa-solid fa-circle-plus" data-product_type="${productType}" ></i>

        </section>
        `
    })

    return productHtml
}

function addToCart(productType, productId){
    
    const targetProduct = foodMenu.filter(function(product){
        return product.id === parseInt(productId)
    })[0]
    console.log(targetProduct)
    
    cartHtml += 
    `
    <div class="order">
        <div class="product">
            <p>Burito <span>(remove)</span></p>
            
        </div>
        <div class="price">
            <p>$12</p>
            
        </div>
    </div>
    `

}

function renderMain(){
    document.getElementById("main").innerHTML = getProductHtml()
}



renderMain()