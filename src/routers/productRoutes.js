'use strict';

const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

// Roteamento de recursos relacionados a produtos
productRouter.route('/api/products')
  .get((req, res) => productController.getProducts(req, res))
  .post((req, res) => productController.createProduct(req, res))
  .put((req, res) => productController.updateProduct(req, res));

// Roteamento de recursos relacionados a produtos com uma URL passando um id como parâmetro
productRouter.route('/api/products/:id')
  .get((req, res) => productController.getProduct(req, res))
  .delete((req, res) => productController.deleteProductById(req, res));

// Tratamento de erros para produtos
productRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor' });
});

module.exports = productRouter;
