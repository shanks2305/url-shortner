const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { nanoid } = require('nanoid');
const monk = require('monk');
require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const collection = db.get('document');

const App = express();

App.use(express.json());

App.use(cors());
App.use(helmet());
App.use(morgan('dev'));

App.get('/', (req, res) => {
  res.json({
    message: 'Hello, Welcome to the URL-Shortner',
  });
});

App.get('/:id', (req, res) => {
  const { id } = req.params;
  collection.findOne({ slug: id }).then((document) => {
    res.status(200).redirect(document.url);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

App.post('/api', (req, res) => {
  collection.insert({
    url: req.body.url,
    slug: nanoid(6),
  }).then((responce) => res.status(200).json(responce)).catch((err) => res.status(400).json(err));
});

App.listen(process.env.PORT, () => {
  console.log('Listening at http://172.27.181.215:8000');
});
