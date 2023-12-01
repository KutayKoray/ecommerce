let menu = document.querySelector("#menu-bars")
let navbar = document.querySelector(".navbar")

menu.onclick = () => {
    menu.classList.toggle("fa-times")
    navbar.classList.toggle("active")
}


window.onscroll = () =>{
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
}

document.querySelector("#search-icon").onclick = () => {
    document.querySelector("#search-form").classList.toggle("active")
}


document.querySelector("#close").onclick = () => {
    document.querySelector("#search-form").classList.toggle("active")
}

var swiper = new Swiper(".home-slider",{
    spaceBetween :300,
    centeredSlides:true,
    autoplay:{
        delay:7500,
        disableOnInteraction: false,
    },
    pagination:{
        el: ".swiper-pagination",
        clickable:true,
    },
    loop:true,
})


var swiper = new Swiper(".review-slider",{
    spaceBetween :20,
    centeredSlides:true,
    autoplay:{
        delay:2500,
        disableOnInteraction: false,
    },
    loop:true,
    breakpoints:{
        0: {
            slidesPerView:1,
        },
        640: {
            slidesPerView:2,
        },
        768: {
            slidesPerView:2,
        },
        1024: {
            slidesPerView:3,
        },
    }
})







let listProducts = []

let listProductHTML = document.querySelector(".listProduct")

const addDataToHTML = ()=>{
    listProductHTML.innerHTML = ""
    if(listProducts.length > 0){
        listProducts.forEach(product=>{
            let newProduct = document.createElement("div")
            newProduct.classList.add("item")
            newProduct.dataset.id = product.id
            newProduct.innerHTML =`
           
            <img src="${product.image}" alt="">
           
           
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="btn addCart">AddCart</button>
            
            `
            listProductHTML.appendChild(newProduct)
        })
    }
}


listProductHTML.addEventListener('click',(event)=>{
    let positionClick = event.target
    if(positionClick.classList.contains("addCart")){
        let product_id = positionClick.parentElement.dataset.id
        addToCart(product_id)
    }
})

let listCartHTML = document.querySelector(".listCart")
let cart =[]

const addToCart = (product_id) =>{
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id)
    if(cart.length<=0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }]
    }
    else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity:1
        })
    }
    else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1 
    }
    addCartToHTML()
    addCartToMemory()
}

const addCartToMemory = () =>{
    localStorage.setItem("cart",JSON.stringify(cart))
}

const addCartToHTML = ()=>{
    listCartHTML.innerHTML =""
    let totalQuantity = 0
    if(cart.length > 0 ){
        cart.forEach(cart =>{
            totalQuantity = totalQuantity + cart.quantity
            let newCart = document.createElement("div")
            newCart.classList.add("item")
            newCart.dataset.id = cart.product_id
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id)
            let info = listProducts[positionProduct]
            newCart.innerHTML = `
            <div class="image">
            <img src="${info.image}" alt="">
        </div>
        <div class="name">
            <p>${info.name}</p>
        </div>
        <div class="totalPrice">
            <p>${info.price * cart.quantity}</p>
        </div>
        <div class="quantity">
            <span class="minus">-</span>
            <span>${cart.quantity}</span>
            <span class="plus">+</span>
        </div>
        
            `
            listCartHTML.appendChild(newCart)
        })
    }
}



listCartHTML.addEventListener("click",(event) =>{
    let positionClick = event.target
    if(positionClick.classList.contains("minus") || positionClick.classList.contains("plus")){
        let product_id = positionClick.parentElement.parentElement.dataset.id
        let type ="minus"
        if(positionClick.classList.contains("plus"))
        {
            type = "plus"
        }
        changeQuantity(product_id,type)
    }
})

const changeQuantity = (product_id,type)=>{
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id)
    if(positionItemInCart >= 0){
        switch (type){
            case "plus":
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1
                break;
            default:
                let valueChange = cart[positionItemInCart].quantity - 1 
                if(valueChange > 0){
                    cart[positionItemInCart].quantity = valueChange
                }
                else{
                    cart.splice(positionItemInCart,1)
                }
                break;
        }
    }
    addCartToMemory()
    addCartToHTML( )
}

const initApp = () =>{
    fetch("products.json")
    .then(response => response.json())
    .then(data =>{
        listProducts = data
        addDataToHTML()
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
            addCartToHTML()
        }
    })
}

initApp()










