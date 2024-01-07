const express = require("express");
const app = express();
const notifier = require("node-notifier");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cron = require('node-cron');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/userlogins.sqlite");
const port = 1100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.enable("trust proxy");
app.use(express.static("public"));

sqlite3.verbose();

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, save TEXT, cardAvailibility TEXT)");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.all("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, rows) => {
    if (err) {
      console.log(err);
    } else if (rows.length > 0) {
      res.cookie("username", username);
      db.all("SELECT userSave FROM users WHERE username = ?", [username], (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.cookie("save", rows[0].save);
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  if (password !== password2) {
    res.redirect("/register");
  }
  // Check if username already exists
  db.all("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
    if (err) {
      console.log(err);
    } else if (rows.length > 0) {
      // Username already exists
      res.send(
        '<html><head>    <link rel="stylesheet" href="/css/index.css" /><link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet" /></head><h1>Username already exists.</h1> <br><h1> <a href="/register">Try again</a></h1></html>'
      );
    } else {
      // Username does not exist, proceed with registration
      db.all("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/login");
        }
      });
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
    res.render("codeAccepted.ejs");
  } else {
    res.send('<script>alert("Incorrect code!")</script>');
  }
});

app.post("/save", (req, res) => {
  let gameState = JSON.stringify(req.body);
  let username = req.cookies.username;
  db.run("UPDATE users SET userSave = ? WHERE username = ?", [gameState, username], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.send({ status: "Game Saved!" });
  });
});

app.post("/load", (req, res) => {
  const username = req.cookies.username;
  db.all("SELECT userSave FROM users WHERE username = ?", [username], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(rows[0].userSave));
    }
  });
});

app.get("/", (req, res) => {
  if (req.cookies.username) {
    res.cookie("save", req.cookies.save);
    res.render("index.ejs", { username: req.cookies.username });
  } else {
    res.render("landing.ejs");
  }
});

function updateCardPackAvailibility() {
  const newValue = "T";
  db.run("UPDATE users SET cardAvailibility = ?", [newValue], (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database variable updated for all users");
    }
  });
}

cron.schedule('0 0 * * *', () => {
  updateCardPackAvailibility();
});

app.get("/adminResetCards", (req, res) => {
  updateCardPackAvailibility();
  res.send("Cards reset!");
});

app.get("/cardpack", (req, res) => {
  if (req.cookies.username) {
    db.all("SELECT cardAvailibility FROM users WHERE username = ?", [req.cookies.username], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        if (rows[0].cardAvailibility === "T") {
          //set cardAvailibility to F
          const newValue = "F";
          db.run("UPDATE users SET cardAvailibility = ?", [newValue], (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Daily redeemed!");
            }
          });
          res.render("dailyPack.ejs", { username: req.cookies.username });
        } else {
          res.send(
            "        <link rel='stylesheet' href='/css/index.css' /><link href='https://fonts.googleapis.com/css2?family=Comfortaa&display=swap' rel='stylesheet' />You have already claimed your Daily Pack for today! Return tomorrow for more rewards. <br> <a href='/'>Return to home</a>"
          );
        }
      }
    });
  } else {
    res.render("landing.ejs");
  }
});

app.post("/checkdaily", (req, res) => {
  if (req.cookies.username) {
    db.all("SELECT cardAvailibility FROM users WHERE username = ?", [req.cookies.username], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        if (rows[0].cardAvailibility === "T") {
          res.send("T");
        } else {
          res.send("F");
        }
      }
    });
  } else {
    res.render("landing.ejs");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
