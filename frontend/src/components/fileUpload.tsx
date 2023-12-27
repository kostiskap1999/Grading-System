import { CloudUpload } from '@mui/icons-material'
import { ChangeEvent, useEffect, useState } from 'react'
import '../styles/button.scss'
import '../styles/login.scss'
import { UserModel } from '../model/UserModel'
import { fetchProjectUserSubmission, postSubmission } from '../api/submissionsApi'
import { SubmissionModel } from '../model/SubmissionModel'
import { ProjectModel } from '../model/ProjectModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface FileUploadProps {
  user: UserModel
  project: ProjectModel
}

export default function FileUpload({ user, project }: FileUploadProps) {

    const [file, setFile] = useState<File | SubmissionModel | null>()
    const [errorText, setErrorText] = useState<string>("")

    useEffect(() => {
      const fetchSubmission = async () => {
            const userSubmission = await fetchProjectUserSubmission(project.id, user.id)
            if(userSubmission)
                setFile(userSubmission)
            else
                setFile(null)
      }
      fetchSubmission()
    }, [project])

    const hasNotAcceptableExtensions = (targetFile: File) => {
      if (!targetFile.name.toLowerCase().endsWith('.js') &&
          !targetFile.name.toLowerCase().endsWith('.ts') &&
          !targetFile.name.toLowerCase().endsWith('.jsx') &&
          !targetFile.name.toLowerCase().endsWith('.tsx') &&
          !targetFile.name.toLowerCase().endsWith('.mjs') &&
          !targetFile.name.toLowerCase().endsWith('.cjs') &&
          !targetFile.name.toLowerCase().endsWith('.es') &&
          !targetFile.name.toLowerCase().endsWith('.es6') &&
          !targetFile.name.toLowerCase().endsWith('.coffee') &&
          !targetFile.name.toLowerCase().endsWith('.vue')) {
            return true
          }else
            return false

    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          if (hasNotAcceptableExtensions(e.target.files[0])) {
            setFile(e.target.files[0])
            alert('Invalid file type. Please submit a valid file type.')
            return
          }else{
            setFile(e.target.files[0])
          }
        }
      }
    
    
      const handleUploadClick = async () => {
        if(!file || hasNotAcceptableExtensions(file as File) || file instanceof SubmissionModel) {
          setErrorText('Invalid file type. Please submit a valid file type.')
          return
        }
        const fileContents = await readFileContents(file as File)
        let submission = new SubmissionModel()
        submission.submitee_id = user.id
        submission.project_id = project.id
        submission.code = fileContents
        await postSubmission(submission)
      }

      const handleDownloadClick = async () => {
        if (file instanceof SubmissionModel) {
          const fileContents = file.code;
          const blob = new Blob([fileContents], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
      
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name || 'download.js';
          document.body.appendChild(a);
          a.click();
      
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }

      const handleRemoveClick = async () => {
        if (file) {}
      }
      

    const readFileContents = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {        
        const reader = new FileReader()
    
        reader.onload = (event) => {
          const fileContents = event.target?.result?.toString()
          if (fileContents) {
            resolve(fileContents)
          } else {
            reject(new Error('Failed to read file contents.'))
          }
        }
    
        reader.onerror = (event) => {
          reject(new Error('Error reading file.'))
        }
    
        reader.readAsText(file)
      })
    }    

  return (
    <>
        {!project.isWithinDeadline() &&
            <div className="list-button small-text">You can not upload a {file && ' new'} submission because the deadline has been exceeded{file && ' but you can download your submission'}.</div>
        }
        <div className='column center'>
            <div className='row center' style={{width: "90%", margin: "20px"}}>
                {project.isWithinDeadline() && <>
                    <label htmlFor="file-upload">
                        <div className="row alt-button" style={{padding: "0 15px", minHeight: "70px"}}>
                            <CloudUpload style={{flex: 0.6, margin: "auto", marginRight: "10px"}}/>
                            <span style={{flex: 3, margin: "auto"}}>Select File</span>
                        </div>
                    </label>
                    <input style={{display: "none"}} id="file-upload" type="file" accept=".js, .ts, .jsx, .tsx, .mjs, .cjs, .es, .es6, .coffee, .vue" onChange={handleFileChange}/>
                </>}
                <div className='row' style={{backgroundColor: "white", minWidth: "400px", maxWidth: "400px", minHeight: "70px"}}>
                    <span className='column center' style={{backgroundColor: 'white', color: "black", flex: 3}}>{(file && file.name) ? `${file.name.length > 20 ? file.name.slice(0, 40) + "..." : file.name}` : "No file selected"}</span>
                    {project.isWithinDeadline() &&
                        <button className="alt-button" style={{flex: 1, padding: "15px"}} onClick={handleUploadClick}>Upload File</button>
                    }
                </div>
            </div>
            <div className='text' style={{height: "50px"}}>{errorText}</div>
            {file instanceof SubmissionModel &&
                <div className='row'>
                    <button className='row center' style={{flex: 1, padding: "15px"}} onClick={handleDownloadClick}>
                        <FontAwesomeIcon icon={faDownload} style={{marginRight: "10px"}} />
                        <span>Download Submission</span>
                    </button>
                    <button className='row center remove-button' style={{flex: 1, padding: "15px"}} onClick={handleRemoveClick}>
                        <FontAwesomeIcon icon={faTrash} style={{marginRight: "10px"}} />
                        <span>Remove Submission</span>
                    </button>
                </div>
            }
        </div>
    </>
  )
}
