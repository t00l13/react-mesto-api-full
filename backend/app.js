const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
require('dotenv').config();

const NotFoundError = require('./errors/NotFoundError');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  validationLogin,
  validationUser,
} = require('./middlewares/validation');

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors);

app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}`);
});

app.post('/sign-in', validationLogin, login);
app.post('/sign-up', validationUser, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
