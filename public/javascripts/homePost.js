function sendLoginPost() {
    let userName = document.getElementById("login-username-form").value;
    let password = document.getElementById("login-password-form").value;
    let data = { username: userName, password: password }


    fetch('http://localhost:3000/api/login', { //current url of the server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(err => {
        alert(err.message);
    })
}

function sendSignUpPost() {
    let userName = document.getElementById("signup-username-form").value;
    let password = document.getElementById("signup-password-form").value;
    let repassword = document.getElementById("signup-repassword-form").value;
    let data = { username: userName, password: password }

    if (password === repassword) {
        fetch('http://localhost:3000/api/signup', { //current url of the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(err => {
            alert(err.message);
        })
    } else{
        alert("wrong pass lmao");
    }

}