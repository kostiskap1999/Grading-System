var createError = require('http-errors');
var express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

router.use((request, response, next) => {
  // console.log(request.originalUrl);
  next();
});

var dblogin = require('./routes/login');
var dbtoken = require('./routes/token');
var dbusers = require('./routes/users');
var dbsubjects = require('./routes/subjects');
var dbprojects = require('./routes/projects');
var dbsubmissions = require('./routes/submissions');


// LOGIN ROUTER
router.route('/login').post(async (request, response) => {
  try {
    const data = await dblogin.login(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// *******************
// ****** USERS ******
// *******************

// USERS ROUTER
router.route('/users').get(async (request, response) => {
  try {
    const data = await dbusers.getUsers(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// USER ROUTER
router.route('/users/:userid').get(async (request, response) => {
  try {
    const data = await dbusers.getUser(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// *******************
// ****** TOKEN ******
// *******************

// TOKEN USER ID ROUTER
router.route('/token/id').get(async (request, response) => {
  try {
    const data = await dbtoken.getUserIDFromToken(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// TOKEN ROLE ROUTER
router.route('/token/role').get(async (request, response) => {
  try {
    const data = await dbtoken.getRoleFromToken(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});



// *******************
// ****** SUBJECTS ******
// *******************

// SUBJECTS ROUTER
router.route('/subjects').get(async (request, response) => {
  try {
    const data = await dbsubjects.getSubjects(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// SUBJECT ROUTER
router.route('/subjects/:id').get(async (request, response) => {
  try {
    const data = await dbsubjects.getSubject(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// USER-SUBJECT ROUTER
router.route('/user-subjects/:userid').get(async (request, response) => {
  try {
    const data = await dbsubjects.getUserSubjects(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});


// *******************
// ****** PROJECTS ******
// *******************

// PROJECTS ROUTER
router.route('/projects').get(async (request, response) => {
  try {
    const data = await dbprojects.getProjects(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// PROJECT ROUTER
router.route('/projects/:id').get(async (request, response) => {
  try {
    const data = await dbprojects.getProject(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// SUBJECT-PROJECTS ROUTER
router.route('/subject-projects/:subjectid').get(async (request, response) => {
  try {
    const data = await dbprojects.getSubjectProjects(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// USER-PROJECTS ROUTER
router.route('/user-projects/:userid').get(async (request, response) => {
  try {
    const data = await dbprojects.getUserProjects(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// PROJECT ROUTER
router.route('/projects/:id').get(async (request, response) => {
  try {
    const data = await dbprojects.getProject(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// POST PROJECTS ROUTER
router.route('/projects').post(async (request, response) => {
  try {
    const data = await dbprojects.postProjects(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// *******************
// ****** SUBMISSIONS ******
// *******************

// SUBMISSIONS ROUTER
router.route('/submissions/:projectid').get(async (request, response) => {
  try {
    const data = await dbsubmissions.getProjectSubmissions(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

// GET SUBMISSIONS ROUTER
router.route('/submissions').post(async (request, response) => {
  try {
    const data = await dbsubmissions.postSubmission(request);
    response.json(data);
  } catch (err) {
    response.statusMessage=err.message
    response.status(err.statusCode).json({error: err.message});
  }
});

module.exports = app;
