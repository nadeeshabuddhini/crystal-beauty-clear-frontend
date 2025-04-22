import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";


export default function TestingPage() {
    const [file, setFile] = useState(null);

    function handleUpload() {
        mediaUpload(file).then(
            (url)=>{
                console.log(url);
                toast.success("File uploaded successfully");
            }
        ).catch(
            (err)=>{
                console.log(err);
                toast.error("File upload failed");
            }
        )
    }

    return(
       
        <div>
            <input type="file" onChange={(e)=>
                setFile(e.target.files[0])}/>
            <button onClick={handleUpload}>upload</button>    
        </div>
    )
}