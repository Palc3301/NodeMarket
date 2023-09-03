'use strict';

const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// Roteamento de recursos relacionados a usuários
userRouter.route('/api/users')
  .get((req, res) => userController.getUsers(req, res))
  .post((req, res) => userController.createUser(req, res))
  .put((req, res) => userController.updateUser(req, res));

// Roteamento de recursos relacionados a usuários com uma URL passando um ID como parâmetro
userRouter.route('/api/users/:id')
  .get((req, res) => userController.getUser(req, res))
  .delete((req, res) => userController.deleteUserById(req, res));

// Tratamento de erros para usuários
userRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor' });
  next();
});

module.exports = userRouter;
