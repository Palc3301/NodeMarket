const Product = require('../models/Product');
const winston = require('winston');

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find({}).select(["-__v", "-_id"]);
      res.status(200).json(products);
    } catch (error) {
      winston.error(`Erro ao recuperar produtos: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro ao recuperar os produtos" });
    }
  },
  deleteProductById: async (req, res) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(204).end(); // 204 significa "No Content"
    } catch (error) {
      winston.error(`Erro ao remover produto: ${error}`);
      res.status(500).json({ message: "Não foi possível remover o produto" });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).select(["-__v", "-_id"]);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.status(200).json(product);
    } catch (error) {
      winston.error(`Erro ao recuperar produto por ID: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro ao recuperar o produto" });
    }
  },
  updateProductById: async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      winston.error(`Erro ao atualizar produto: ${error}`);
      res.status(500).json({ message: "Não foi possível atualizar o produto" });
    }
  },
  createProduct: async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json({ message: `Produto ${newProduct.name} foi criado com sucesso` });
    } catch (error) {
      winston.error(`Erro ao criar produto: ${error}`);
      res.status(500).json({ message: "Não foi possível criar o produto" });
    }
  }
};
