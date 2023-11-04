var createError = require('http-errors');
var express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');

var app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
});

var dblogin = require('./routes/login');
var dbusers = require('./routes/users');
var dbsubjects = require('./routes/subjects');
var dbprojects = require('./routes/projects');
var dbsubmissions = require('./routes/submissions');
var dbusersubjects = require('./routes/usersubjects');
var dbuserprojects = require('./routes/userprojects');


// LOGIN ROUTER
router.route('/login').get(async (request, response) => {
  try {
    const data = await dblogin.login(request);
    response.json(data);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// USERS ROUTER
router.route('/users').get(async (request, response) => {
  try {
    const data = await dbusers.getUsers(request);
    response.json(data);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// SUBJECTS ROUTER
router.route('/subjects').get(async (request, response) => {
  try {
    const data = await dbsubjects.getSubjects(request);
    response.json(data);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// PROJECTS ROUTER
router.route('/projects').get(async (request, response) => {
  try {
    const data = await dbprojects.getProjects(request);
    response.json(data);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// SUBMISSIONS ROUTER
router.route('/submissions').get(async (request, response) => {
  try {
    const data = await dbsubmissions.getSubmissions(request);
    response.json(data);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// USER-SUBJECTS ROUTER
router.route('/usersubjects').get(async (request, response) => {
  try {
    const data = await dbusersubjects.getUserSubjects(request);
    response.json(data);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// USER-PROJECTS ROUTER
router.route('/userprojects').get(async (request, response) => {
  try {
    const data = await dbuserprojects.getUserProjects(request);
    response.json(data);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;
