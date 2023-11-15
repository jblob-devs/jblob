const express = require("express");
const app = express();
const notifier = require("node-notifier");
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
  db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, save TEXT)");
});

app.get("/login", (req, res) => {
  res.render("login.html");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.all("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, rows) => {
    if (err) {
      console.log(err);
    } else if (rows.length > 0) {
      res.cookie("username", username);
      db.all("SELECT save FROM users WHERE username = ?", [username], (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.cookie("save", rows[0].save);
        }
      });
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register.html");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  if (password !== password2) {
    res.redirect("/register");
  }
  db.all("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});



app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

app.post("/code", (req, res) => {
  const code = req.body.code;
  if (code === "1234") {
    res.render('codeAccepted.html');
  } else {
    res.send('<script>alert("Incorrect code!")</script>');
  }
});

app.post("/save", (req, res) => {
  const username = req.cookies.username;
  const save = req.body.save;
  db.all("UPDATE users SET save = ? WHERE username = ?", [save, username], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.post("/load", (req, res) => {
  const username = req.cookies.username;
  db.all("SELECT save FROM users WHERE username = ?", [username], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows[0].save);
    }
  });
});

app.get("/", (req, res) => {
  if (req.cookies.username) {
    res.cookie("save", req.cookies.save);
    res.render("index.html", { username: req.cookies.username });
  } else {
    res.render("landing.html");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
