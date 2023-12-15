
import express, { Express, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { errorHandling } from './errors/errorHandling';
import { UserManager } from './manager/login';
import * as Signal from './util/signal';
import util from 'util'
import db from './database/config'

util.promisify(db.connect)

const app: Express = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

router.use((request, response, next) => {
  // console.log(request.originalUrl);
  next();
});

function handle(p: Promise<unknown>) {
  return p.catch(Signal.onError.call)
  .finally(() => {
    Signal.afterRequest.call();
    Signal.onError.clear();
    Signal.afterRequest.clear();
  })
}

app.use(errorHandling);

// let dblogin = require('./routes/login');
// let dbtoken = require('./routes/token');
// let dbusers = require('./routes/users');
// let dbsubjects = require('./routes/subjects');
// let dbprojects = require('./routes/projects');
// let dbsubmissions = require('./routes/submissions');
// let dbtests = require('./routes/tests');

// LOGIN ROUTER
// router.route('/login').post(async (request, response) => {
//   try {
//     const data = await dblogin.login(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

router.route('/login').post(async (req, res) => {
  let data = await handle(new UserManager().login(req.body))
  res.json(data);
})

module.exports = app

// // *******************
// // ****** USERS ******
// // *******************

// // USERS ROUTER
// router.route('/users').get(async (request, response) => {
//   try {
//     const data = await dbusers.getUsers(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // USER ROUTER
// router.route('/users/:userid').get(async (request, response) => {
//   try {
//     const data = await dbusers.getUser(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // *******************
// // ****** TOKEN ******
// // *******************

// // TOKEN USER ID ROUTER
// router.route('/token/id').get(async (request, response) => {
//   try {
//     const data = await dbtoken.getToken(request).userId;
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // TOKEN ROLE ROUTER
// router.route('/token/role').get(async (request, response) => {
//   try {
//     const data = await dbtoken.getToken(request).role;
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });



// // *******************
// // ****** SUBJECTS ******
// // *******************

// // SUBJECTS ROUTER
// router.route('/subjects').get(async (request, response) => {
//   try {
//     const data = await dbsubjects.getSubjects(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // SUBJECT ROUTER
// router.route('/subjects/:id').get(async (request, response) => {
//   try {
//     const data = await dbsubjects.getSubject(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // USER-SUBJECT ROUTER
// router.route('/user-subjects/:userid').get(async (request, response) => {
//   try {
//     const data = await dbsubjects.getUserSubjects(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });


// // *******************
// // ****** PROJECTS ******
// // *******************

// // PROJECTS ROUTER
// router.route('/projects').get(async (request, response) => {
//   try {
//     const data = await dbprojects.getProjects(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // PROJECT ROUTER
// router.route('/projects/:id').get(async (request, response) => {
//   try {
//     const data = await dbprojects.getProject(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // SUBJECT-PROJECTS ROUTER
// router.route('/subject-projects/:subjectid').get(async (request, response) => {
//   try {
//     const data = await dbprojects.getSubjectProjects(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // USER-PROJECTS ROUTER
// router.route('/user-projects/:userid').get(async (request, response) => {
//   try {
//     const data = await dbprojects.getUserProjects(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // PROJECT ROUTER
// router.route('/projects/:id').get(async (request, response) => {
//   try {
//     const data = await dbprojects.getProject(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // POST PROJECTS ROUTER
// router.route('/projects').post(async (request, response) => {
//   try {
//     const data = await dbprojects.postProjects(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // *******************
// // ****** SUBMISSIONS ******
// // *******************

// // SUBMISSIONS ROUTER
// router.route('/submissions/:projectid').get(async (request, response) => {
//   try {
//     const data = await dbsubmissions.getProjectSubmissions(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // GET SUBMISSIONS ROUTER
// router.route('/submissions').post(async (request, response) => {
//   try {
//     const data = await dbsubmissions.postSubmission(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// // GET INPUTS_OUTPUTS ROUTER
// router.route('/tests/:projectID').get(async (request, response) => {
//   try {
//     const data = await dbtests.getTests(request);
//     response.json(data);
//   } catch (err) {
//     response.statusMessage=err.message
//     response.status(err.statusCode).json({error: err.message});
//   }
// });

// module.exports = app;
