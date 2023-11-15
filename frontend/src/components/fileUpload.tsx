import { CloudUpload } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import '../styles/button.scss';
import '../styles/login.scss';
import { User } from '../model/user';
import { postProject } from '../fetches/fetchProjects';
import { prepareSubmission } from '../fetches/helpers/preparePosting';

interface FileUploadProps {
  user: User;
  pID: number;
}

export default function FileUpload({ user, pID }: FileUploadProps) {

    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    
    
      const handleUploadClick = async () => {
        if (!file) {
          return;
        }

        const reader = new FileReader();

        var fileContents: string
        reader.onload = async (event) => {
            fileContents = event.target?.result!.toString()!;
            await prepareSubmission({user: user, pID: pID, code: fileContents})
        };

      };

  return (
    <div className='row' style={{maxHeight: "50px", margin: "20px"}}>
        <label htmlFor="file-upload" className="file-upload column center">
            <div className="row" style={{backgroundColor: "white"}}>
                <CloudUpload style={{flex: 0.6, margin: "auto", marginRight: "10px"}}/>
                <span style={{flex: 3, margin: "auto"}}>Custom Upload</span>
            </div>
        </label>
        <input style={{display: "none"}} id="file-upload" type="file" onChange={handleFileChange}/>
        <div style={{backgroundColor: "white", width: "400px"}}>
            {file != null ? file && `${file.name.length > 20 ? file.name.slice(0, 40) + "..." : file.name}  -  ${file.type}` : "No file selected"}
        </div>
        <button className="button" style={{padding: "15px"}} onClick={async () => {await handleUploadClick()}}>Upload Project</button>
    </div>    
  );
}
