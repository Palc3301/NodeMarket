'use strict';

const express = require('express');
const promotionRouter = express.Router();
const promotionController = require('../controllers/promotionController');

// Roteamento de recursos relacionados a promoções
promotionRouter.route('/api/promotions')
  .get((req, res) => promotionController.getPromotions(req, res))
  .post((req, res) => promotionController.createPromotion(req, res))
  .put((req, res) => promotionController.updatePromotion(req, res));

// Roteamento de recursos relacionados a promoções com uma URL passando um id como parâmetro
promotionRouter.route('/api/promotions/:id')
  .get((req, res) => promotionController.getPromotion(req, res))
  .delete((req, res) => promotionController.deletePromotionById(req, res));

// Tratamento de erros para promoções
promotionRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor' });
});

module.exports = promotionRouter;
