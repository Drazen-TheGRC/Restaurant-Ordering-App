import { foodMenu } from "./data.js"
import { drinkMenu } from "./data.js"

let isFood = true
let menu
let cart = []



document.addEventListener("click", function(e){

    if(e.target.dataset.product_id){
        addToCart(e.target.dataset.product_id)
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
    else if(e.target.dataset.food_menu){
        switchMenu(e.target.dataset.food_menu)
    }
    else if(e.target.dataset.drink_menu){
        switchMenu(e.target.dataset.drink_menu)
    }
    else if(e.target.dataset.complete_order_btn){
        togglePopUp()
    }
    else if(e.target.dataset.close_pop_up){
        togglePopUp()
    }
    
})



function getProductHtml(){

    let productHtml = ""
    
    if(isFood){
        menu = foodMenu
    }else{
        menu = drinkMenu
    }

    productHtml =
        `
        <div class="menuBtns">
            <button class="foodBtn " data-food_menu="food" >Food Menu</button>
            <button class="drinkBtn " data-drink_menu="drink" >Drink Menu</button>
        </div>
        
        `

    menu.forEach(function(product){

        // List of ingredient
        let ingredientList = ""
        product.ingredients.forEach(function(ingredient){
            ingredientList += ingredient + ", "
        })
        ingredientList = ingredientList.substring(0, ingredientList.length-2)
        // console.log("Product: " + product.name + ". Ingredients: " + ingredientList)
        // console.log(product.id)

        productHtml +=
        `
        <section>
            <p class="emoji" role="img" aria-label="${product.name}">${product.emoji}</p>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p>${ingredientList}</p>
                <h3>$${product.price}</h3>
            </div>

            <i class="add fa-solid fa-circle-plus clickable" data-product_id="${product.id}" ></i>

        </section>
        `
    })

    return productHtml
}


function addToCart(productId){
    
    // Getting clicked product
    
    let targetProduct
    if(isFood){
        targetProduct = foodMenu.filter(function(product){
            return product.id === parseInt(productId)
        })[0]
    }else{
        targetProduct = drinkMenu.filter(function(product){
            return product.id === parseInt(productId)
        })[0]
    }

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



function switchMenu(menu){
    if(menu != "food"){
        isFood = false
        
        renderMain()
    }else{
        
        isFood = true
        renderMain()
    }
}
function renderMain(){
    document.getElementById("main").innerHTML = getProductHtml()
    if(isFood){
        document.getElementsByClassName("foodBtn")[0].classList.add("no-click")
    }else{
        document.getElementsByClassName("drinkBtn")[0].classList.add("no-click")
    }
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
                <p>${product.name} ${product.emoji} <span class="remove clickable" data-remove_product="${product.name}" >(remove)</span></p>
            </div>

            <div class="price">
                <div class="price-math-add">
                    <div class="div-qty">
                        <p>
                            <i class="fa-solid fa-circle-minus clickable" data-sub_product="${product.name}" ></i>
                        </p>
                    </div>
                    <div class="div-qty">
                        <p>
                            <span class="qty">${product.quantityInCart}</span>
                        </p>
                    </div>
                    <div class="div-qty">
                        <p>
                            <i class="fa-solid fa-circle-plus clickable" data-add_product="${product.name}"></i>
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
        document.getElementsByClassName("complete_order_btn")[0].classList.remove("no-click")
    }else{
        // Here I can remove hidden at the end to make footer visable all the time,
        // it needs to be done also in css footer
        document.getElementsByTagName("footer")[0].style.visibility = "" // visible / hidden

        document.getElementById("orderHeading").textContent = "You haven't put anything in your cart yet"
        document.getElementById("total-price").textContent = "$0.00"
        document.getElementsByClassName("complete_order_btn")[0].classList.add("no-click")
    }

}


let isPayMode = false
function togglePopUp(){
    
    document.getElementById("complete-order-div").classList.toggle("hidden")

    const elements = document.getElementsByClassName("clickable")
    for(let element of elements){
        element.classList.toggle("no-click")
    }


    isPayMode = !isPayMode
    if(isPayMode){
        document.getElementsByClassName("foodBtn")[0].classList.add("no-click")
        document.getElementsByClassName("drinkBtn")[0].classList.add("no-click")
    }else{
        if(isFood){
            document.getElementsByClassName("foodBtn")[0].classList.add("no-click")
            document.getElementsByClassName("drinkBtn")[0].classList.remove("no-click")
        }else{
            document.getElementsByClassName("foodBtn")[0].classList.remove("no-click")
            document.getElementsByClassName("drinkBtn")[0].classList.add("no-click")
        }
    }
}




// First main render
renderMain()
// First cart render
renderCart()





