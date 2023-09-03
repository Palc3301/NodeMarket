const PromotionModel = require('../models/Promotion');

module.exports = {
  getPromotions: async (req, res) => {
    try {
      const promotions = await PromotionModel.find({}).select(["-__v", "-_id"]);
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro ao recuperar as promoções" });
    }
  },
  deletePromotionById: async (req, res) => {
    try {
      await PromotionModel.deleteOne({ _id: req.params.id });
      res.status(204).end();
    } catch (error) {
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
      res.status(500).json({ message: "Ocorreu um erro ao recuperar a promoção" });
    }
  },
  updatePromotionById: async (req, res) => {
    try {
      // Valide as datas e o percentual de desconto aqui antes de atualizar
      const { startDate, endDate, discountPercentage } = req.body;

      // Verifique se as datas são válidas (por exemplo, startDate < endDate)
      if (startDate && endDate && startDate >= endDate) {
        return res.status(400).json({ message: "Data de início deve ser anterior à data de término" });
      }

      // Verifique se o percentual de desconto está dentro de limites válidos (por exemplo, 0-100)
      if (discountPercentage < 0 || discountPercentage > 100) {
        return res.status(400).json({ message: "Percentual de desconto deve estar entre 0 e 100" });
      }

      // Se todas as validações passarem, atualize a promoção
      await PromotionModel.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json({ message: "Promoção atualizada com sucesso" });
    } catch (error) {
      // Personalize a mensagem de erro com base no tipo de erro, se possível
      res.status(500).json({ message: "Não foi possível atualizar a promoção" });
    }
  }
  ,
  createPromotion: async (req, res) => {
    try {
      // Valide as datas e o percentual de desconto aqui antes de criar a promoção
      const { startDate, endDate, discountPercentage } = req.body;

      // Verifique se as datas são válidas (por exemplo, startDate < endDate)
      if (startDate && endDate && startDate >= endDate) {
        return res.status(400).json({ message: "Data de início deve ser anterior à data de término" });
      }

      // Verifique se o percentual de desconto está dentro de limites válidos (por exemplo, 0-100)
      if (discountPercentage < 0 || discountPercentage > 100) {
        return res.status(400).json({ message: "Percentual de desconto deve estar entre 0 e 100" });
      }

      // Se todas as validações passarem, crie a nova promoção
      const newPromotion = await PromotionModel.create(req.body);

      res.status(201).json({ message: `Promoção ${newPromotion.name} foi criada com sucesso` });
    } catch (error) {
      // Personalize a mensagem de erro com base no tipo de erro, se possível
      res.status(500).json({ message: "Não foi possível criar a promoção" });
    }
  }
};
