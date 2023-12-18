
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { errorHandling } from './errors/errorHandling';
import { UserManager } from './manager/user';
import * as Signal from './util/signal';
import util from 'util'
import db from './database/config'
import { checkToken, getToken } from './manager/token';
import { SubjectManager } from './manager/subject';
import { ProjectManager } from './manager/project';
import { SubmissionManager } from './manager/submission';
import { TestManager } from './manager/test';

util.promisify(db.connect)

const app: Express = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

router.use((req, res, next) => {
  // console.log(req.originalUrl);
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

// *******************
// ****** USER ******
// *******************

// LOGIN ROUTER
router.route('/login').post(async (req, res) => {
  console.log('/login')
  let data = await handle(new UserManager().login(req.body))
  res.json(data);
})

// GET USER ROUTER
router.route('/users/:userId').get(async (req, res) => {
  console.log('/users/:userId')
  let data = await handle(new UserManager().getUser(parseInt(req.params.userId), req.headers.token as string))
  res.json(data);
});


// *******************
// ****** TOKEN ******
// *******************

// GET TOKEN USER ID ROUTER
router.route('/token/id').get(async (req, res) => {
  console.log('/token/id')
  let data = (await checkToken(req.headers.token as string)).userId
  res.json(data);
});

// GET TOKEN ROLE ROUTER
router.route('/token/role').get(async (req, res) => {
  console.log('/token/role')
  let data = (await checkToken(req.headers.token as string)).role
  res.json(data);
});


// *******************
// ****** SUBJECTS ******
// *******************

// GET SUBJECTS ROUTER
router.route('/subjects').get(async (req, res) => {
  console.log('/subjects')
  let data = await handle(new SubjectManager().getSubjects(req.headers.token as string))
  res.json(data);
});

// GET SUBJECT ROUTER
router.route('/subjects/:id').get(async (req, res) => {
  console.log('/subjects/:id')
  let data = await handle(new SubjectManager().getSubject(parseInt(req.params.id), req.headers.token as string))
  res.json(data);
});

// GET USER-SUBJECT ROUTER
router.route('/user-subjects/:userId').get(async (req, res) => {
  console.log('/user-subjects/:userId')
  let data = await handle(new SubjectManager().getUserSubjects(parseInt(req.params.userId), req.headers.token as string))
  res.json(data);
});


// *******************
// ****** PROJECTS ******
// *******************

// GET PROJECTS ROUTER
router.route('/projects').get(async (req, res) => {
  console.log('/projects')
  let data = await handle(new ProjectManager().getProjects(req.headers.token as string))
  res.json(data);
});

// GET PROJECT ROUTER
router.route('/projects/:id').get(async (req, res) => {
  console.log('/projects/:id')
  let data = await handle(new ProjectManager().getProject(parseInt(req.params.id), req.headers.token as string))
  res.json(data);
});

// GET SUBJECT-PROJECTS ROUTER
router.route('/subject-projects/:subjectId').get(async (req, res) => {
  console.log('/subject-projects/:subjectId')
  let data = await handle(new ProjectManager().getSubjectProjects(parseInt(req.params.subjectId), req.headers.token as string))
  res.json(data);
});

// GET USER-PROJECTS ROUTER
router.route('/subject-projects/:userId').get(async (req, res) => {
  console.log('/subject-projects/:userId')
  let data = await handle(new ProjectManager().getUserProjects(parseInt(req.params.userId), req.headers.token as string))
  res.json(data);
});

// POST PROJECTS ROUTER
router.route('/subject-projects').post(async (req, res) => {
  console.log('/subject-projects')
  let data = await handle(new ProjectManager().postProject(req.body, req.headers.token as string))
  res.json(data);
});

// *******************
// ****** SUBMISSIONS ******
// *******************

// GET SUBMISSIONS ROUTER
router.route('/submissions/:projectId').get(async (req, res) => {
  console.log('/submissions/:projectId')
  let data = await handle(new SubmissionManager().getSubmissions(parseInt(req.params.projectId), req.headers.token as string))
  res.json(data);
});

// POST SUBMISSIONS ROUTER
router.route('/submissions').post(async (req, res) => {
  console.log('/submissions')
  let data = await handle(new SubmissionManager().postSubmission(req.body, req.headers.token as string))
  res.json(data);
});


// *******************
// ****** TESTS ******
// *******************

// GET TESTS ROUTER
router.route('/tests/:projectId').get(async (req, res) => {
  console.log('/tests/:projectId')
  let data = await handle(new TestManager().getTests(parseInt(req.params.projectId), req.headers.token as string))
  res.json(data);
});

module.exports = app