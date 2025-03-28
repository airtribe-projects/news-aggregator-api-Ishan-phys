const express = require('express');
const userRouter = require('./routes/userRoutes');
const newsRouter = require('./routes/newsRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/news', newsRouter);

module.exports = app;
