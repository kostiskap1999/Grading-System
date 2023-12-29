import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { ProjectModel } from '../model/ProjectModel';
import { SubmissionModel } from '../model/SubmissionModel';
import { patchSubmission } from '../api/submissionsApi';

export default function CodeSandbox({ project, submission }: { project: ProjectModel, submission: SubmissionModel }) {
  const [code, setCode] = useState<string>('')
  const [log, setLog] = useState<string>('No tests running<br>')
  const [grade, setGrade] = useState<number | null>(null)
  const [isSubmittingGrade, setIsSubmittingGrade] = useState<boolean | null>(null)
  
  useEffect(() => {
    setCode(submission.code)
  }, [submission.code])

  useEffect(() => {
    if(grade !== null)
      setLog((prevLog) => `${prevLog}Grade <span style="color: ${grade >= 5 ? 'green' : 'red'}">${grade}</span>`);

      if(isSubmittingGrade !== null)
        if(isSubmittingGrade)
          setLog((prevLog) => `${prevLog} and submitted successfully<br>`);
        else
          setLog((prevLog) => `${prevLog} and not submitted<br>`);
      
      setIsSubmittingGrade(null)
      setGrade(null)
  }, [grade])


  const runCode = async (grading: boolean) => {
    let passedTests = 0

    try{
      setIsSubmittingGrade(grading)
      setLog(``);
      submission.grade = null
      
      project.tests.forEach((test, index) => {
        setLog((prevLog) => `${prevLog}Running test ${index + 1}<br>`)
        let inputCode = test.inputs.map(input => typeof input.code === 'string' && !isNaN(Number(input.code)) ? input.code : `'${input.code}'`).join(', ');

        let finalCode = `${code}
        return ${test.mainFunction}(${inputCode});
        `
        let result = Function(finalCode)()
        result = result ? result.toString() : null

        if (result == test.output.code){
          passedTests++
          setLog((prevLog) => `${prevLog}<span style="color: green;">Test ${index + 1} completed.</span> Got <span style="color: darkblue;">(${inputCode})</span> as input(s) and <span style="color: darkblue;">${test.output.code}</span> as output<br>`);
        }
        else{
          setLog((prevLog) => `${prevLog}<span style="color: darkred;">Test ${index + 1} failed.</span> Got <span style="color: darkblue;">(${inputCode})</span> as input(s) and expected <span style="color: darkblue;">${test.output.code}</span> as output. Got output <span style="color: darkblue;">${result}</span><br>`);
        }
      });
    }
    catch{
      setLog(`There was something wrong with the code parsing. Execution aborted.<br>`)
    }

    let gradeVar = Math.round(passedTests/project.tests.length*10 * 2) / 2
    setGrade(gradeVar)
    
    if(grading){
      submission.grade = gradeVar
      await patchSubmission(submission)
    }
  }

  return (
    <div>
      <div style={{marginBottom: "50px"}}>
        <CodeMirror value={code} onChange={setCode} height="200px" style={{marginBottom: "10px", color: "black", fontSize: "14px"}} extensions={[javascript({ jsx: true })]} />
        <div className="row" style={{justifyContent: "space-between"}}>
          <button className="list-button" onClick={async () => await runCode(false)}>Run tests</button>
          <button className="list-button" onClick={async () => await runCode(true)}>Run tests and grade</button>
          <button className="list-button" onClick={() => {}}>Remove grade</button>
        </div>
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: log }} />
    </div>
  );
}
