const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/texts.sqlite");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.enable("trust proxy");
app.use(express.static("public"));

sqlite3.verbose();


app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
