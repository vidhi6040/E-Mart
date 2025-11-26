fetch("/api/user")
.then(res => res.json())
.then(data => {
    const auth = document.getElementById("auth-links");
    if(auth)
    {
        if(data.loggedIn)
        {
            auth.innerHTML = `
            Welcome, <b>${data.Username}<b> !!<br>
            <a href="#" id="logout" class="icon" style="color: #1e90ff">Logout</a>
            `
            document.getElementById("logout").onclick = function()
            {
                fetch("/logout")
                .then(() => location.replace("/"));
            }
        }
        else
        {
            auth.innerHTML = `
            <a class="icon" href="login.html">Log In | </a>
            <a class="icon" href="register.html">Register</a>
            `
        }
    }
})