import { useState, ChangeEvent } from 'react';
import '../styles/login.scss';
import '../styles/button.scss';
import { CloudUpload } from '@mui/icons-material';



export default function FileUpload() {

    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    
    
      const handleUploadClick = () => {
        if (!file) {
          return;
        }
    
        // Uploading the file using the fetch API to the server
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
        <button className="button" style={{padding: "15px"}} onClick={handleUploadClick}>Upload</button>
    </div>    
  );
}
