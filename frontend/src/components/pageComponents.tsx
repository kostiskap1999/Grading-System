import { ProjectModel } from "../model/ProjectModel";
import { SubjectModel } from "../model/SubjectModel";
import { SubmissionModel } from "../model/SubmissionModel";
import CodeSandbox from "./codeSandbox";

export function ProjectEntry({ project, userRole }: { project: ProjectModel, userRole?: number }) {
    return (
        <div>
            <div className="center" style={{padding:"30px"}}>
            <div className="header-text center">{project.name}</div>
            <div className="center">Deadline: {project.deadline.toLocaleString('el-GR', { year: 'numeric', month: 'numeric', day: 'numeric' })}</div>
            </div>
            {userRole != null && userRole <= 1 && <GradeLine component={project} grade={project.averageGrade} />}
            <div style={{margin: "20px"}}>
            <div className="large-text center">Project Description</div>
            <div className="center">{project.description}</div>
            </div>
        </div>
    );
}

export function SubjectEntry({ subject, userRole }: { subject: SubjectModel, userRole?: number }) {
    return (
        <div>
            <div className="center">
                <div className="header-text center">{subject.name}</div>
                <div className="center">Semester: {subject.semester}</div>
                {userRole != null && userRole <= 1 && <GradeLine component={subject} grade={subject.averageGrade} /> }
            </div>
            <div className="center">{subject.description}</div>
        </div>
    );
}

export function SubmissionEntry({ project, submission }: { project: ProjectModel, submission: SubmissionModel }) {
    return (
        <div>
            <div className="center" style={{padding:"30px"}}>
                <div className="header-text">{submission.student?.firstName + " " + submission.student?.lastName}</div>
            </div>
            <div style={{margin: "20px"}}>
                <div className="large-text center">Submission Code</div>
                <GradeLine component={submission} grade={submission.grade} />
                <CodeSandbox project={project} submission={submission} />
            </div>
      </div>
    );
}


export function PageButtonDescription({ component, showGrade }: { component: SubjectModel | ProjectModel | SubmissionModel, showGrade?: boolean }) {
    let grade = null;
    if(component instanceof SubjectModel)
        grade = component.userGrade
    else if(component instanceof ProjectModel)
        grade = component.averageGrade
    else if(component instanceof SubmissionModel)
        grade = component.grade
  
    return (
    <div style={{backgroundColor:"transparent", justifyContent:"space-between"}} className="row center">
      <span>{}</span>
      <span>{component.name}</span>
      {showGrade ? <GradeLine grade={grade} /> : <span></span>}
  </div>
  );
}

function GradeLine({ component, grade }: { component?: SubjectModel | ProjectModel | SubmissionModel, grade: number | null}) {
    return(<>
    {component ?
        <div className="center" style={{padding:"10px"}}>
            <div className="row center">
                <span>{component instanceof SubjectModel ? "Subject Average" :
                component instanceof ProjectModel ? "Project Average":
                component instanceof SubmissionModel ? "Submission" : 
                ""} Grade:&nbsp;&nbsp;</span>
                <GradeBox grade={grade} />
            </div>
        </div>
    :
        <GradeBox grade={grade} />
    }</>)
}

function GradeBox({ grade }: { grade: number | null}) {
    return (
        <span className={`grade-box ${grade !== null && !isNaN(grade) ? (grade >= 5 ? 'green-box' : 'red-box') : 'gray-box'}`}>
            {grade !== null && !isNaN(grade) ? (grade % 1 !== 0 ? grade?.toFixed(1) : grade)  : "-"}
        </span>
    )
}

