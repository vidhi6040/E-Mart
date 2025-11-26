const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vidhireet",
    database: "emart_db"
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connected to Server.");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/main.html"));
});

app.post("/register", (req, res) => {
    const {Username, Email, Password} = req.body;
    if(!Username || !Email || !Password)
    {
        return res.send("Pls fill all fields.");
    }
    con.query("SELECT *FROM auth_table WHERE Name = ?", [Username], (err, results) => {
        if(results.length > 0)
        {
            return res.send("User already exists.");
        }
        con.query("INSERT INTO auth_table (Name, Email, Password) VALUES (?, ?, ?)", [Username, Email, Password], (err)=> {
            if(err) throw err;
            console.log("New User has registered.");
            res.redirect("/login.html");
        });
    });
});

app.post("/login", (req, res) => {
    const {Username, Password} = req.body;
    if(!Username || !Password)
    {
        return res.send("Pls fill all fields.");
    }
    con.query("SELECT *FROM auth_table WHERE Name = ?", [Username], (err, results) => {
        if(results.length === 0)
        {
            return res.send("Invalid Username or Password");
        }
        const user = results[0];
        if(Password == user.Password)
        {
            req.session.user = user.Name;
            res.redirect("/main.html");
        }
        else
        {
            res.send("Invalid Username or Password");
        }
    });
});

app.get("/api/user", (req, res) => {
    if(req.session.user)
    {
        return res.json({loggedIn: true, Username: req.session.user});
    }
    else
    {
        return res.json({loggedIn: false});
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/main.html");
    });
});

app.get("/item/:id", (req, res) => {
    const item_id = req.params.id;
    con.query("SELECT *FROM item_table WHERE item_id = ?", [item_id], (err, results) => {
        if(err) throw err;
        if(results.length === 0)
        {
            return res.send("Item not found.");
        }
        res.render("item", {item: results[0]});
    });
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});