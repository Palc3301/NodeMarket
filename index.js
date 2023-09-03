'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const productRouter = require('./src/routers/productRoutes');
const promotionRouter = require('./src/routers/promotionRoutes');
const userRouter = require('./src/routers/userRoutes');

app.use(express.json());

app.use(productRouter);
app.use(promotionRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`O servidor está executando na porta ${port}`);
});
