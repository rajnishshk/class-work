const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.set("view engine", "ejs");
const products = require("./data/product");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// index
app.get("/", (req, res) => {
  //   res.send("working fine!");
  res.render("index");
});
// products list
app.get("/products", (req, res) => {
  res.render("products", { products });
});

//add new products
//got to adding page
app.get("/products/add", (req, res) => {
  res.render("add");
});

//make change in products page
app.post("/products", (req, res) => {
  console.log(req.body);
  const { productName, price, description } = req.body;
  const product = {
    id: products.length + 1,
    productName,
    price,
    description,
  };
  products.unshift(product);
  res.redirect("/products");
});

// view product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  let product = products.find((item) => item.id == id);
  res.render("show", { product });
});
//edit products details
//      ----got to edit page
app.get("/products/:id/edit", (req, res) => {
  const { id } = req.params;
  let product = products.find((item) => item.id == id);
  res.render("edit", { product });
});
// -----------make change in original product page
app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  let product = products.find((item) => item.id == id);
  const { productName, price, description } = req.body;
  product.productName = productName;
  product.price = price;
  product.description = description;
  res.redirect("/products");
});
// delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  let product = products.find((item) => item.id == id);
  let index = products.indexOf(product);
  products.splice(index, 1);
  res.redirect("/products");
});

app.listen(port, () => {
  console.log(`server listening at port : ${port}`);
});
