const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

const products = require('./products.js');

app.use(express.static('static'));

// Flip Deal Product Listing Page
// Q1 Get the products sorted by popularity
function getSortProductsByPopularity(e) {
  return e.sort((a, b) => b.rating - a.rating);
}
app.get('/products/sort/popularity', (request, response) => {
  const sortedProducts = getSortProductsByPopularity(products);
  response.json({ products: sortedProducts });
});

// Q2 Get the products sorted by “high-to-low” price
function getSortProductsByPriceBA(e) {
  return e.sort((a, b) => b.price - a.price);
}
app.get('/products/sort/price-high-to-low', (request, response) => {
  const sortedProducts = getSortProductsByPriceBA(products);
  response.json({ products: sortedProducts });
});

// Q3 Get the products sorted by “low-to-high” price
function getSortProductsByPriceAB(e) {
  return e.sort((a, b) => a.price - b.price);
}
app.get('/products/sort/price-low-to-high', (request, response) => {
  const sortedProducts = getSortProductsByPriceAB(products);
  response.json({ products: sortedProducts });
});

// Q4  Filter the products based on the “RAM” option.
function filterByRam(e, ram) {
  return e.filter((product) => product.ram == ram);
}
app.get('/products/filter/ram', (request, response) => {
  const ram = request.query.ram;
  const result = filterByRam(products, ram);
  response.json({ products: result });
});

// Q5 Filter the products based on the “ROM” option.
function filterByRom(e, rom) {
  return e.filter((product) => product.rom == rom);
}
app.get('/products/filter/rom', (request, response) => {
  const rom = request.query.rom;
  const result = filterByRom(products, rom);
  response.json({ products: result });
});

// Q6 Filter the products based on the “Brand” option.
function filterByBrand(e, brand) {
  return e.filter(
    (product) => product.brand.toLowerCase() == brand.toLowerCase()
  );
}
app.get('/products/filter/brand', (request, response) => {
  const brand = request.query.brand;
  const result = filterByBrand(products, brand);
  response.json({ products: result });
});

// Q7 Filter the products based on the “OS” option.
function filterByOs(e, os) {
  return e.filter(
    (product) => product.os.toLowerCase() == os.toLowerCase()
  );
}
app.get('/products/filter/os', (request, response) => {
  const os = request.query.os;
  const result = filterByOs(products, os);
  response.json({ products: result });
});

// Q8 Filter the products based on the “Price” option.
function filterByPrice(e, price) {
  return e.filter(
    (product) => product.price <= price
  );
}
app.get('/products/filter/price', (request, response) => {
  const price = request.query.price;
  const result = filterByPrice(products, price);
  response.json({ products: result });
});

// Q9 Send original array of products
app.get('/products', (request, response) => {
  response.json({ products: products });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
