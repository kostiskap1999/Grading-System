import { useEffect, useState } from 'react';
import { ProjectModel } from "../model/ProjectModel";
import { SubjectModel } from "../model/SubjectModel";
import { SubmissionModel } from "../model/SubmissionModel";
import CodeSandbox from "./codeSandbox";
import { patchProject } from '../api/projectsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteSubject } from '../api/subjectsApi';
import { useNavigate } from 'react-router-dom';

export function ProjectEntry({ project, userRole }: { project: ProjectModel, userRole?: number }) {

    const [newDate, setNewDate] = useState<string>()
    const [projectDate, setProjectDate] = useState<string>()
    const [submitText, setSubmitText] = useState<string>("")
    
    useEffect(() => {
        console.log(newDate)
        const deadlineDate = new Date(project.deadline)
        const localDeadline = new Date(deadlineDate.getTime() - deadlineDate.getTimezoneOffset() * 60000)
        setProjectDate(localDeadline.toISOString().split('T')[0])
        setNewDate(localDeadline.toISOString().split('T')[0])
    }, [project])

    const submitDeadlineChange = async () => {
        if(projectDate === newDate){
            setSubmitText("New deadline can't be the same as the previous one")
            return
        }

        project.deadline = newDate ?? project.deadline
        const patched = await patchProject(project)
        if(patched)
            setSubmitText("Deadline changed successfully")
        else
            setSubmitText("Failed to change deadline")
    }
    
    return (
        <div>
            <div className="center" style={{padding:"30px"}}>
                <div className="header-text center">{project.name}</div>
                <div className='column'>
                    <div className="center">Deadline</div>
                    <div className='row center'>
                        {userRole != null && userRole <= 1 && <div style={{marginRight: "165px"}}></div>}
                        <input
                            id="deadline"
                            type="date"
                            value={newDate || ''}
                            disabled={(userRole !== null && userRole !== undefined) ? userRole > 1 : true}
                            onClick={() => setSubmitText("")}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        {userRole != null && userRole <= 1 &&
                            <button className='icon-button-small' style={{marginLeft: "50px", width: "115px"}} onClick={async () => (await submitDeadlineChange())}>Change Deadline</button>}
                    </div>
                    <div>{submitText}</div>
                </div>
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
    
    const navigate = useNavigate();

    const delSubject = async () => {
        const userConfirmed = window.confirm("Are you sure you want to delete this subject? This action can't be taken back.");

        if (userConfirmed) {
            await deleteSubject(subject.id)
            navigate('/subjects')
            window.location.reload()
        }
    }

    return (
        <div>
            <div className="column center">
                <div className="row center" style={{width: "100%", justifyContent: "space-between"}}>
                    <div style={{marginRight: "10px"}}></div>
                    <div className="header-text center">{subject.name}</div>
                    <button
                        type="button"
                        className="remove-button icon-button-small"
                        onClick={() => {delSubject()}}
                        style={{ padding: "13px", margin: "5px 10px 0 0"}}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
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

