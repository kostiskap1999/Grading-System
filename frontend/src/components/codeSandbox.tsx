import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { ProjectModel } from '../model/ProjectModel';
import { SubmissionModel } from '../model/SubmissionModel';
import { patchSubmission } from '../api/submissionsApi';
import { isFirstCharacterBracket } from '../util/JSONOrArrayValidation';

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

      setIsSubmittingGrade(grading)
      setLog(``);
      submission.grade = null
      
      project.tests.forEach((test, index) => {
        setLog((prevLog) => `${prevLog}Running test ${index + 1} with input <span style="color: darkblue;">(${inputCode})</span><br>`)
        let inputCode = test.inputs.map(input => {
            if (isFirstCharacterBracket(input.code) || (typeof input.code === 'string' && !isNaN(Number(input.code))))
                return input.code
            else
                return `'${input.code}'`
          }).join(', ')

          console.log(inputCode)

        let finalCode = `${code}
        return ${test.mainFunction}(${inputCode});
        `

        try{
            let result = Function(finalCode)()
            // result = result ? result.toString() : null
            result = result.toString()
            

            if (result == test.output.code){
            passedTests++
            setLog((prevLog) => `${prevLog}<span style="color: green;">Test ${index + 1} completed.</span> Got <span style="color: darkblue;">${test.output.code}</span> as output<br><br>`);
            }
            else{
            setLog((prevLog) => `${prevLog}<span style="color: darkred;">Test ${index + 1} failed.</span> Expected <span style="color: darkblue;">${test.output.code}</span> as output. Got <span style="color: darkblue;">${result}</span> as output.<br><br>`);
            }
        }
        catch (error: any) {
            setLog((prevLog) => `${prevLog}Could not run code. <span style="color: red;">${error}</span><br><br>`);
        }
      });


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
