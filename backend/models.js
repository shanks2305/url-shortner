const mongoose = require('mongoose');

const urls = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Urls', urls);
