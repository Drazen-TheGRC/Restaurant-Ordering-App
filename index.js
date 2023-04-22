import { foodMenu } from "./data.js"
import { drinkMenu } from "./data.js"

let isFood = true
let menu
let cart = []



document.addEventListener("click", function(e){

    if(e.target.id){
        if(isFood){
            addToCart(e.target.dataset.product_type, e.target.id)
        }else{
            
        }
    }
    else if(e.target.dataset.add_product){
        addQty(e.target.dataset.add_product)
    }
    else if(e.target.dataset.sub_product){
        subQty(e.target.dataset.sub_product)
    }
    else if(e.target.dataset.remove_product){
       removeProduct(e.target.dataset.remove_product)
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
    
    // Getting clicked product
    let targetProduct = foodMenu.filter(function(product){
        return product.id === parseInt(productId)
    })[0]

    // Checking if clicked product already exists in the cart
    let existsInChart = cart.filter(function(product){
        return product.name === targetProduct.name
    })[0]

    if(existsInChart){
        existsInChart.quantityInCart++
    }else{
        
        cart.push(
            {
                name: targetProduct.name,
                ingredients: targetProduct.ingredients,
                price: targetProduct.price,
                emoji: targetProduct.emoji,
                id: targetProduct.id,
                quantityInCart: 1
            }
        )
    }



    
    renderCart()
}

function addQty(productName){
    let targetProduct = cart.filter(function(product){
        return product.name === productName
    })[0]
    targetProduct.quantityInCart++

    renderCart()
}

function subQty(productName){
    let targetProduct = cart.filter(function(product){
        return product.name === productName
    })[0]
    targetProduct.quantityInCart--

    if(targetProduct.quantityInCart < 1){
        let indexOfProduct = cart.indexOf(targetProduct)
        cart.splice(indexOfProduct, 1)
    }

    renderCart()
}

function removeProduct(productName){
    let targetProduct = cart.filter(function(product){
        return product.name === productName
    })[0]
    
    let indexOfProduct = cart.indexOf(targetProduct)
    cart.splice(indexOfProduct, 1)
    renderCart()
}


function renderMain(){
    document.getElementById("main").innerHTML = getProductHtml()
}

function renderCart(){
    let totalPrice = 0

    let cartHtml = ""
    cart.forEach(function(product){
        totalPrice += product.price*product.quantityInCart
        cartHtml += 
        `
        <div class="order">
            <div class="product">
                <p>${product.name} <span class="remove" data-remove_product="${product.name}" >(remove)</span></p>
            </div>

            <div class="price">
                <div class="price-math-add">
                    <div class="div-qty">
                        <p>
                            <i class="fa-solid fa-circle-minus" data-sub_product="${product.name}" ></i>
                        </p>
                    </div>
                    <div class="div-qty">
                        <p>
                            <span class="qty">${product.quantityInCart}</span>
                        </p>
                    </div>
                    <div class="div-qty">
                        <p>
                            <i class="fa-solid fa-circle-plus" data-add_product="${product.name}"></i>
                        </p>
                    </div>
                </div>

                <div class="price-math-total">
                    <p>$${parseFloat(product.price*product.quantityInCart).toFixed(2)}</p>
                </div>

                
                
            </div>
        </div>
        `
    })

    document.getElementById("cart").innerHTML = cartHtml

    if(cart.length > 0){
        document.getElementsByTagName("footer")[0].style.visibility = "visible"
        document.getElementById("orderHeading").textContent = "Your order"
        document.getElementById("total-price").textContent = "$" + parseFloat(totalPrice).toFixed(2)
    }else{
        document.getElementsByTagName("footer")[0].style.visibility = "hidden"
    }

}



renderMain()

