const express = require("express");
const { getAllKittens, getKittens } = require("./data/kittens");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/kittens/all", (req, res) => {
  getAllKittens((err, kittens) => {
    if (err) {
      return res.status(500);
    }

    res.render("kittens", { kittens, page: -1 });
  });
});

app.get("/kittens/page/:page", (req, res) => {
  const page = parseInt(req.params.page || 1);
  getKittens(10, page, (err, kittens) => {
    if (err) {
      return res.status(500);
    }

    res.render("kittens", { kittens, page });
  });
});

app.get("/kittens/page/:page/:limit", (req, res) => {
  const limit = parseInt(req.params.limit || 10)
  const page = parseInt(req.params.page || 1);
  getKittens(limit, page, (err, kittens) => {
    if (err) {
      return res.status(500);
    }

    res.render("kittens-limit", { kittens, page, limit });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
