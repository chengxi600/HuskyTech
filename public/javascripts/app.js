// Sign up/Login page

(function() {


let signupLink = document.getElementById("signup");
let loginLink = document.getElementById("login");

let login = document.getElementById("login-form");
let signup = document.getElementById("signup-form");


function toSignUp() {
    signupLink.style.display = 'initial';
    loginLink.style.display = 'none';
    clearForm(login);
}

function toLogin() {
    signupLink.style.display = 'none';
    loginLink.style.display = 'initial';
    clearForm(signup);
}

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

//Cart button animation

function buttonOnClick() {
    let buttons = document.querySelectorAll(".cart-button");
      for (var i = 0; i < buttons.length; i++) {
          buttons[i].onclick = (e) => {
                e.target.innerHTML = "Added!"; 
              setTimeout(() => {
                e.target.innerHTML = "Add to Cart";         
              }, 2000);
        }
    }
}

buttonOnClick();

})();