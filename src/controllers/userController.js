const UserModel = require('../models/User');
const winston = require('winston');

module.exports = {
  getPromotions: async (req, res) => {
    try {
      const promotions = await PromotionModel.find({}).select(["-__v", "-_id"]);
      res.status(200).json(promotions);
    } catch (error) {
      winston.error(`Erro ao recuperar promoções: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro ao recuperar as promoções" });
    }
  },
  deletePromotionById: async (req, res) => {
    try {
      await PromotionModel.deleteOne({ _id: req.params.id });
      res.status(204).end(); // 204 significa "No Content"
    } catch (error) {
      winston.error(`Erro ao remover promoção: ${error}`);
      res.status(500).json({ message: "Não foi possível remover a promoção" });
    }
  },
  getPromotionById: async (req, res) => {
    try {
      const promotion = await PromotionModel.findById(req.params.id).select(["-__v", "-_id"]);
      if (!promotion) {
        return res.status(404).json({ message: "Promoção não encontrada" });
      }
      res.status(200).json(promotion);
    } catch (error) {
      winston.error(`Erro ao recuperar promoção por ID: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro ao recuperar a promoção" });
    }
  },
  updatePromotionById: async (req, res) => {
    try {
      await PromotionModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Promoção atualizada com sucesso" });
    } catch (error) {
      winston.error(`Erro ao atualizar promoção: ${error}`);
      res.status(500).json({ message: "Não foi possível atualizar a promoção" });
    }
  },
  createPromotion: async (req, res) => {
    try {
      const newPromotion = await PromotionModel.create(req.body);
      res.status(201).json({ message: `Promoção ${newPromotion.name} foi criada com sucesso` });
    } catch (error) {
      winston.error(`Erro ao criar promoção: ${error}`);
      res.status(500).json({ message: "Não foi possível criar a promoção" });
    }
  }
};
