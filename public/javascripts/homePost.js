//This page should contain all functions that communicates with the backend

//login button onclick
function sendLoginPost() {
    let userName = document.getElementById("login-username-form").value;
    let password = document.getElementById("login-password-form").value;
    //data to be sent to backend
    let data = { username: userName, password: password }
    window.localStorage.setItem("username", userName);

    fetch('http://localhost:3000/api/login', { //current url of the server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //send to backend as a stringified json
        body: JSON.stringify(data)
    }).then(response => {
        //backend returns the response in json form
        return response.json();
    }).then(data => {
        if (data.status === "success") {
            document.location.href = data.body;
            //window.localStorage.setItem("username", userName);
        } else {
            alert(data.body);
        }
    }).catch(err => {
        alert(err.message);
    })
}

//signup button onclick
function sendSignUpPost() {
    let userName = document.getElementById("signup-username-form").value;
    let password = document.getElementById("signup-password-form").value;
    let repassword = document.getElementById("signup-repassword-form").value;
    let firstName = document.getElementById("signup-firstname-form").value;
    let lastName = document.getElementById("signup-lastname-form").value;
    //data to be sent to backend
    let data = {
        firstName: firstName,
        lastName: lastName,
        username: userName,
        password: password
    }
    //if the reinput passwords are the same
    if (password === repassword) {
        //post request 
        fetch('http://localhost:3000/api/signup', { //current url of the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data.status);
            if (data.status === "success") {
                window.localStorage.setItem("username", userName)
                document.location.href = data.body;
            } else {
                alert(data.body);
            }
        }).catch(err => {
            alert(err.message);
        })
    } else {
        alert("Please make the passwords match.");
    }

}

//getting top rated brand and model task query from backend
//should be called when home page is loaded
function getTopRatedModel() {
    fetch('http://localhost:3000/api/top-rated', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.status === "success") {
            //change the DOM to display top rated model
            let topModel = document.getElementById("top-rated-model");
            let topRating = document.getElementById("top-rated-rating");
            let model = data.body.modelName + ", " + data.body.brandName;
            topModel.innerHTML = model;
            let rating = document.createElement("p");
            rating.textContent = data.body.rating + "/10";
            topRating.appendChild(rating);
            
            //creating rating stars favicon 
            for (let i = 0; i < 10; i++) {
                let star = document.createElement("span");
                if (i < data.body.rating) {
                    star.className = "fa fa-star checked";

                } else {
                    star.className = "fa fa-star";
                }
                topRating.appendChild(star);
            }

        } else {
            alert(data.body);
        }
    })
}

//Products page searchbutton onclick
function searchButton() {
    // clear session storage which holds the current search result products
    Object.keys(sessionStorage).forEach(function(key) {
        if(key.includes("item")) {
            window.sessionStorage.removeItem(key);
        }
    })
    // remove all childs (search results from last search query)
    let parentDiv = document.getElementById("merch-parent");
    parentDiv.innerHTML = '';
    let city = document.getElementById('cityInput').value;
    let state = document.getElementById('stateInput').value;
    let zip = document.getElementById('zipInput').value;

    let e = document.getElementById('sort-by-price');
    let sortBy = e.options[e.selectedIndex].value;

    let includeLaptop = document.getElementById('laptop-check').checked;
    let includeDesktop = document.getElementById('desktop-check').checked;
    let includePhone = document.getElementById('phone-check').checked;
    
    //creating filter array to send to backend
    let filter = []
    if (includeLaptop) {
        filter.push("Laptop");
    }

    if (includeDesktop) {
        filter.push("Desktop");
    }

    if (includePhone) {
        filter.push("Phone");
    }

    //if the search bar is not empty:
    if (city && state && zip) {
        fetch('http://localhost:3000/api/search-bar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([city, state, zip, sortBy, filter])
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.status === "failure") {
                alert(data.body);
            } else {

                //the three placeholder images for products
                let pictures = ["laptop.jpg", "desktop.jpg", "phone.jpg"];

                //count that ids the current search result product
                let count = 0;

                //for each product, create a HTML card in DOM
                data.body.forEach(product => {
                    let containerDiv = document.createElement("div");
                    containerDiv.className = "col-3 card-container";

                    let cardDiv = document.createElement("div");
                    cardDiv.className = "card h-100";

                    let cardImage = document.createElement("img");
                    cardImage.className = "card-img-top";
                    //chooses a random picture for product
                    cardImage.src = "../images/" + pictures[Math.floor(Math.random() * 3)];

                    let cardBody = document.createElement("div");
                    cardBody.className = "card-body";

                    let cardBody2 = document.createElement("div");
                    cardBody2.className = "card-body";

                    let cardFooter = document.createElement("div");
                    cardFooter.className = "card-footer";

                    let cardTitle = document.createElement("h5");
                    cardTitle.className = "card-title";
                    cardTitle.textContent = product.model;

                    let cardText = document.createElement("p");
                    cardText.className = "card-text";
                    cardText.textContent = "Price: $" + product.price;

                    let reviewLink = document.createElement("a");
                    reviewLink.href = "#";
                    reviewLink.className = "card-link";
                    reviewLink.innerHTML = "Write a review!";
                    //"Add to Cart" has a unique value so we can retrieve product information
                    reviewLink.value = count;

                    let cartLink = document.createElement("a");
                    cartLink.href = "#void";
                    cartLink.className = "card-link cart-button"
                    cartLink.innerHTML = "Add to Cart"
                    //"Add to Cart" has a unique value so we can retrieve product information
                    cartLink.value = count;

                    let smallStock = document.createElement("small");
                    smallStock.className = "text-muted";
                    smallStock.innerHTML = "Left in stock: ";
                    let stock = document.createElement("span");
                    stock.innerHTML = product.stocks
                    if (product.stocks < 10) {
                        stock.style.color = "red";
                    }
                    smallStock.appendChild(stock);

                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardText);

                    cardBody2.appendChild(reviewLink);
                    cardBody2.appendChild(cartLink);

                    cardFooter.appendChild(smallStock);

                    cardDiv.appendChild(cardImage);
                    cardDiv.appendChild(cardBody);
                    cardDiv.appendChild(cardBody2);
                    cardDiv.appendChild(cardFooter);

                    containerDiv.appendChild(cardDiv);
                    parentDiv.appendChild(containerDiv);

                    //Session storage for product search results since we don't want to clog up local storage
                    //key is a unique count, value is the product information
                    window.sessionStorage.setItem("item"+count, JSON.stringify(product));

                    //"Add to Cart" onclick
                    cartLink.onclick = (e) => {
                        //get product being added to cart
                        let stringData = window.sessionStorage.getItem("item"+e.target.value);
                        //generate random key for item
                        let key = Math.floor((Math.random() * 10000000));
                        //check for collision
                        while (window.localStorage.getItem("cart" + key) != null) {
                            window.localStorage.getItem("cart" + key)
                            key = Math.floor((Math.random() * 10000000));
                        }
                        //put cart item in localstorage
                        window.localStorage.setItem("cart" + key, stringData);
                    };

                    //"Write a review!" onclick
                    reviewLink.onclick = (e) => {
                        //get product being reviewed
                        let stringData = window.sessionStorage.getItem("item"+e.target.value);
                        //remember product being reviewed
                        window.sessionStorage.setItem("reviewItem");

                    }
                    //increments count so next product has unique id
                    count++;
                })
            }
        }).catch(err => {
            alert("Something went wrong with your request. Please try again.");
        })
    } else {
        alert("Please fill in all the inputs.")
    }
}

function getOrderNumber() {
    let data = [window.localStorage.getItem("username")];
    fetch('http://localhost:3000/api/order-number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(data => {
        if(data.status === "failure") {
            alert(data.body)
        } else{
            return data.body+1;
        }
    }).catch(err => {
        alert("Something went wrong with your request. Please try again.");
    })
}

function submitCart() {
    let oNum = getOrderNumber();
    let username = document.getElementById("username").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;
    let status = "sent";
    let serials = getSerialNumbers();
    
    //adds all cart item information to array
    Object.keys.forEach(function(key) {
        if(key.includes("cart")) {
            cartItems.push(window.localStorage.getItem(key));
        }
    })

    let data = [oNum, username, address, city, state, zip, status, serials];

    fetch('http://localhost:3000/api/cartHandle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.status === "success") {
            //remove all cart items
            Object.keys(localStorage).forEach(function(key) {
                if(key.includes("cart")) {
                    window.localStorage.removeItem(key);
                }
            })
        } else {
            alert(data.body)
        }  
    }).catch(err => {
        alert("Something went wrong with your request. Please try again.");
    })
}

function getSerialNumbers() {
    let brands = []
    let models = []
    

    Object.keys(localStorage).forEach(function(key) {

    })

    fetch('http://localhost:3000/api/serial-number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === "success") {

        } else{
            alert(data.body)
        }
    })
}

function getOrders() {
    let customer = document.getElementById().value;
    let data = {username: customer};
    fetch('http://localhost:3000/api/getOrders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === "success") {

        } else{
            alert(data.body)
        }
    })
}