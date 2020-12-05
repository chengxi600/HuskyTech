//This page should contain all helper onclick functions

//Cart button animation
let buttons = document.querySelectorAll(".cart-button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = (e) => {
            e.target.innerHTML = "Added!"; 
            setTimeout(() => {
            e.target.innerHTML = "Add to Cart";         
            }, 2000);
    }
}



let signupLink = document.getElementById("signup");
let loginLink = document.getElementById("login");
let login = document.getElementById("login-form");
let signup = document.getElementById("signup-form");

//hides login component, displays signup, and clears form
function toSignUp() {
    signupLink.style.display = 'initial';
    loginLink.style.display = 'none';
    clearForm(login);
}

//hides sign component, displays login, and clears form
function toLogin() {
    signupLink.style.display = 'none';
    loginLink.style.display = 'initial';
    clearForm(signup);
}

//clears form
function clearForm(form) {
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i<inputs.length; i++) {
        console.log(inputs[i].type);
        switch (inputs[i].type) {
            case 'text':
                inputs[i].value = '';
                break;
            case 'password':
                inputs[i].value = '';
                break;
            case 'checkbox':
                inputs[i].checked = false;
        }
    }
}

//loads the cart information to DOM in cart page
function toCart() {
    //clears session storage which are all the items in product page
    //NOTE: we prob shouldn't clear cuz what if you click cart then click back to products page, you can't add more stuff to cart anymore
    window.sessionStorage.clear();

    let cartCount = document.getElementById("cart-count");
    cartCount.innerHTML = numberOfItemsInCart();
    let totalPrice = 0;
    let items = document.getElementById("cart-items");
    
    //iterate through keys and find products in cart
    Object.keys(localStorage).forEach(function(key) {
        //if its a cart item
        if(key.includes("cart")) {
            let data = JSON.parse(localStorage.getItem(key));
            let lst = document.createElement("li");
            // Formatted Container for Model Name and Brand Name and price
            lst.className = "list-group-item d-flex justify-content-between lh-condensed";
            // Container for Model Name and Brand Name
            let di = document.createElement("div");
            lst.appendChild(di);
            // Model Name
            let modelName = document.createElement("h6");
            modelName.className = "my-0";
            modelName.textContent = data.model;
            // Brand Name
            let brandName = document.createElement("small");
            brandName.className = "text-muted";
            brandName.textContent = data.brand;
            di.appendChild(modelName);
            di.appendChild(brandName);
            // Price
            let price = document.createElement("span");
            price.className = "text-muted";
            price.textContent = "$" + data.price;
            totalPrice += data.price;
            lst.appendChild(price);
            items.appendChild(lst);
        }
    });
    //total price
    let price = document.createElement("li");
    price.className = "list-group-item d-flex justify-content-between";
    let total = document.createElement("span");
    total.innerHTML =  "Total (USD)";
    let priceNumber = document.createElement("strong");
    priceNumber.innerHTML = "$" + totalPrice;
    price.appendChild(total);
    price.appendChild(priceNumber);
    items.appendChild(price);   
}

function numberOfItemsInCart() {
    let count = 0;
    Object.keys(localStorage).forEach(function(key) {
        if(key.includes("cart")) {
            count++;
        }
    })
    return count;
}

function clearCart() {
    Object.keys(localStorage).forEach(function(key) {
        if(key.includes("cart")) {
            window.localStorage.removeItem(key);
        }
    })
}