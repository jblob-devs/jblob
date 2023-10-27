const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.enable("trust proxy");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
