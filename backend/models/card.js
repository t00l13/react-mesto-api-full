const mongoose = require('mongoose');
const { validationUrl } = require('../middlewares/validation');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: validationUrl,
      message: 'Ссылка не валидна',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
