function sendPost() {
    let userName = document.getElementById("login-username-form").value;
    let password = document.getElementById("login-password-form").value;
    let data = {username: userName, password: password}
    fetch('http://localhost:3000/login', { //current url of the server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(err => {
        alert(err.message);
    })
}