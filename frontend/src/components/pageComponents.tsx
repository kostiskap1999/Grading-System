import { ProjectModel } from "../model/ProjectModel";
import { SubjectModel } from "../model/SubjectModel";
import { SubmissionModel } from "../model/SubmissionModel";

export function ProjectEntry({ project, userRole }: { project: ProjectModel, userRole?: number }) {
    return (
        <div>
            <div className="center" style={{padding:"30px"}}>
            <div className="header-text center">{project.name}</div>
            <div className="small-text center">Deadline: {project.deadline.toLocaleString('el-GR', { year: 'numeric', month: 'numeric', day: 'numeric' })}</div>
            </div>
            {userRole != null ? userRole <= 1 ?
            <div className="center" style={{padding:"10px"}}>
            <div className="small-text center">
                <span>Project Average Grade: </span>
                <span className={`grade-box ${project.averageGrade !== null && !isNaN(project.averageGrade) ? (project.averageGrade >= 5 ? 'green-box' : 'red-box') : 'gray-box'}`}>
                {project.averageGrade !== null  && !isNaN(project.averageGrade) ?
                    (project.averageGrade % 1 !== 0 ? project.averageGrade?.toFixed(1) : project.averageGrade) 
                : " - "}
                </span>
            </div>
            </div>
            :<></> : <></>}
            <div style={{margin: "20px"}}>
            <div className="large-text center">Project Description</div>
            <div className="small-text center">{project.description}</div>
            </div>
        </div>
    );
}

export function SubjectEntry({ subject }: { subject: SubjectModel }) {
    return (
        <div>
            <div className="center">
                <div className="header-text center">{subject.name}</div>
                <div className="small-text center">Semester: {subject.semester}</div>
            </div>
            <div className="small-text center">{subject.description}</div>
        </div>
    );
}

export function PageButtonDescription({ component, userRole }: { component: SubjectModel | ProjectModel | SubmissionModel, userRole?: number }) {
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
      {userRole != null ? userRole <= 1 ? 
        <span className={`grade-box ${grade !== null && !isNaN(grade) ? (grade >= 5 ? 'green-box' : 'red-box') : 'gray-box'}`}>
          {grade !== null && !isNaN(grade) ?
            (grade % 1 !== 0 ? grade?.toFixed(1) : grade) 
          : " - "}
        </span>
      : <span></span> : <span></span>}
  </div>
  );
}

