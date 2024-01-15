
import express, { Express, Response, Request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { errorHandling } from './errors/errorHandling';
import { UserManager } from './manager/user';
import * as Signal from './util/signal';
import util from 'util'
import db from './database/config'
import { checkToken } from './manager/token';
import { SubjectManager } from './manager/subject';
import { ProjectManager } from './manager/project';
import { SubmissionManager } from './manager/submission';
import { TestManager } from './manager/test';
import { TransactionManager } from './manager/transaction';

util.promisify(db.connect)

const app: Express = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

router.use((req, res, next) => {
  console.log(req.method + " " + req.originalUrl);
  next();
});

async function transact<R>(res: Response, context: { (tm: TransactionManager): Promise<R> }) {
  const tm = await TransactionManager.createTransaction();
  try {
    let data = await context(tm)
    if (data)
      res.json(data)
  } catch(err) {
    tm.onError()
    errorHandling(err as Error, res)
  } finally {
    tm.commit()
  }
}

app.use((err: Error, req: Request, res: Response, next: unknown) => {
  errorHandling(err as Error, res)
})


// *******************
// ****** USER ******
// *******************

// LOGIN ROUTER
router.route('/login').post(async (req, res) => {
  await transact(res, tm => new UserManager(tm).login(req.body))
})

// REGISTER ROUTER
router.route('/register').post(async (req, res) => {
    await transact(res, tm => new UserManager(tm).register(req.body))
  })

// GET USER ROUTER
router.route('/users/:userId').get(async (req, res) => {
  await transact(res, tm => new UserManager(tm).getUser(parseInt(req.params.userId), req.headers.token as string))
});


// *******************
// ****** TOKEN ******
// *******************

// GET TOKEN USER ID ROUTER
router.route('/token/id').get(async (req, res) => {
  try {
    return res.json((await checkToken(req.headers.token as string)).userId)
  } catch (err) {
    errorHandling(err as Error, res)
  }
});

// GET TOKEN ROLE ROUTER
router.route('/token/role').get(async (req, res) => {
  try {
    return res.json((await checkToken(req.headers.token as string)).role)
  } catch (err) {
    errorHandling(err as Error, res)
  }
});


// *******************
// ****** SUBJECTS ******
// *******************

// GET SUBJECTS ROUTER
router.route('/subjects').get(async (req, res) => {
  await transact(res, tm => new SubjectManager(tm).getSubjects(req.headers.token as string))
});

// GET SUBJECT ROUTER
router.route('/subjects/:id').get(async (req, res) => {
    await transact(res, tm => new SubjectManager(tm).getSubject(parseInt(req.params.id), req.headers.token as string))
  });

// GET SUBJECTS ROUTER
router.route('/subjects').post(async (req, res) => {
    await transact(res, tm => new SubjectManager(tm).postSubject(req.body, req.headers.token as string))
});

// GET SUBJECTS ROUTER
router.route('/subjects').patch(async (req, res) => {
    await transact(res, tm => new SubjectManager(tm).patchSubject(req.body, req.headers.token as string))
});

// DELETE SUBJECTS ROUTER
router.route('/subjects/:id').delete(async (req, res) => {
    await transact(res, tm => new SubjectManager(tm).deleteSubject(req.params.id, req.headers.token as string))
});

// *******************
// ****** USER-SUBJECTS ******
// *******************

// GET USER-SUBJECTS ROUTER
router.route('/user-subjects/:userId').get(async (req, res) => {
  await transact(res, tm => new SubjectManager(tm).getUserSubjects(parseInt(req.params.userId), req.headers.token as string))
});

// POST USER-SUBJECTS ROUTER
router.route('/user-subjects').post(async (req, res) => {
  await transact(res, tm => new SubjectManager(tm).postUserSubject(req.body, req.headers.token as string))
});

// DELETE USER-SUBJECTS ROUTER
router.route('/user-subjects/:userId/:subjectId').delete(async (req, res) => {
  await transact(res, tm => new SubjectManager(tm).deleteUserSubject(parseInt(req.params.userId), parseInt(req.params.subjectId), req.headers.token as string))
});

// GET SUBJECT-USERS ROUTER
router.route('/subject-users/:subjectId').get(async (req, res) => {
    await transact(res, tm => new SubjectManager(tm).getSubjectUsers(parseInt(req.params.subjectId), req.headers.token as string))
});

// *******************
// ****** PROJECTS ******
// *******************

// GET PROJECTS ROUTER
router.route('/projects').get(async (req, res) => {
  await transact(res, tm => new ProjectManager(tm).getProjects(req.headers.token as string))
});

// GET PROJECT ROUTER
router.route('/projects/:id').get(async (req, res) => {
  await transact(res, tm => new ProjectManager(tm).getProject(parseInt(req.params.id), req.headers.token as string))
});

// POST PROJECTS ROUTER
router.route('/projects').post(async (req, res) => {
    await transact(res, tm => new ProjectManager(tm).postProject(req.body, req.headers.token as string))
});

// PATCH PROJECTS ROUTER
router.route('/projects').patch(async (req, res) => {
    await transact(res, tm => new ProjectManager(tm).patchProject(req.body, req.headers.token as string))
});

// DELETE PROJECTS ROUTER
router.route('/projects/:id').delete(async (req, res) => {
    await transact(res, tm => new ProjectManager(tm).deleteProject(req.params.id, req.headers.token as string))
});

// GET SUBJECT-PROJECTS ROUTER
router.route('/subject-projects/:subjectId').get(async (req, res) => {
  await transact(res, tm => new ProjectManager(tm).getSubjectProjects(parseInt(req.params.subjectId), req.headers.token as string))
});

// GET USER-PROJECTS ROUTER
router.route('/user-projects/:userId').get(async (req, res) => {
  await transact(res, tm => new ProjectManager(tm).getUserProjects(parseInt(req.params.userId), req.headers.token as string))
});


// *******************
// ****** SUBMISSIONS ******
// *******************

// GET SUBMISSIONS ROUTER
router.route('/submissions/:projectId').get(async (req, res) => {
  await transact(res, tm => new SubmissionManager(tm).getSubmissions(parseInt(req.params.projectId), req.headers.token as string))
});

// GET SUBMISSION ROUTER
router.route('/submissions/:projectId/:userId').get(async (req, res) => {
  await transact(res, tm => new SubmissionManager(tm).getSubmissionBySubmitee(parseInt(req.params.projectId), parseInt(req.params.userId), req.headers.token as string))
});

// POST SUBMISSIONS ROUTER
router.route('/submissions').post(async (req, res) => {
  await transact(res, tm => new SubmissionManager(tm).postSubmission(req.body, req.headers.token as string))
});

// PATCH SUBMISSIONS ROUTER
router.route('/submissions').patch(async (req, res) => {
  await transact(res, tm => new SubmissionManager(tm).patchSubmission(req.body, req.headers.token as string))
});


// *******************
// ****** TESTS ******
// *******************

// GET TESTS ROUTER
router.route('/tests/:projectId').get(async (req, res) => {
  await transact(res, tm => new TestManager(tm).getTests(parseInt(req.params.projectId), req.headers.token as string))
});

module.exports = app