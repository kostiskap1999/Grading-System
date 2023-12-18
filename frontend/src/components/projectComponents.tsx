import { ProjectModel } from "../model/ProjectModel";

export function ProjectEntry({ project, userRole }: { project: ProjectModel, userRole?: number }) {
  return (
    <div>
        <div className="center" style={{padding:"30px"}}>
        <div className="header-text">{project.name}</div>
        <div className="small-text">Deadline: {project.deadline.toLocaleString('el-GR', { timeZone: 'UTC' })}</div>
        </div>
        {userRole != null ? userRole <= 1 ?
        <div className="center" style={{padding:"10px"}}>
        <div className="small-text">
            <span>Project Average Grade: </span>
            <span className={`grade-box ${project.averageGrade !== null ? (project.averageGrade >= 5 ? 'green-box' : 'red-box') : 'gray-box'}`}>
            {project.averageGrade !== null ?
                (project.averageGrade % 1 !== 0 ? project.averageGrade?.toFixed(1) : project.averageGrade) 
            : " - "}
            </span>
        </div>
        </div>
        :<></> : <></>}
        <div style={{margin: "20px"}}>
        <div className="large-text center">Project Description</div>
        <div className="small-text">{project.description}</div>
        </div>
    </div>
  );
}

