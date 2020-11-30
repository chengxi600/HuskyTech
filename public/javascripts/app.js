let signUp = document.getElementById("sign-up-click");
signUp.onClick = function(e) {
    let sign = document.getElementById("signup");
    sign.style.visibility = "visible";
    e.target.style.visibility = "hidden";
};


let loginIn = document.getElementById("login-in-click");
loginIn.onclick = function(e) {
    let login = document.getElementById("lognin");
    login.style.visibility = "visible";
    e.target.style.visibility = "hidden";
}