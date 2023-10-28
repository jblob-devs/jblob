const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/userlogins.sqlite");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.enable("trust proxy");
app.use(express.static("public"));

sqlite3.verbose();

db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, PRIMARY KEY(username))"
    );
    }
);

app.get("/login", (req, res) => {
    res.render("login.html");
    });

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.all(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, rows) => {
        if (err) {
            console.log(err);
        } else if (rows.length > 0) {
            res.cookie("username", username);
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
        }
    );
    }
);

app.get("/register", (req, res) => {
    res.render("register.html");
}
);

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    if (password !== password2) {
        res.redirect("/register");
    }
    db.all(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login");
        }
        }
    );
    }
);

app.get("/logout", (req, res) => {
    res.clearCookie("username");
    res.redirect("/");
}
);



app.get("/", (req, res) => {
    if (req.cookies.username) {
        res.render("index.html", { username: req.cookies.username });
    } else {
        res.render("landing.html");
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
