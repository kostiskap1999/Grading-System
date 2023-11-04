var createError = require('http-errors');
var express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');

var app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
});

var dbtest = require('./routes/test');

router.route('/test').get(async (request, response) => {
  try {
    const data = await dbtest.test();
    console.log(data);
    response.json(data[0]);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
