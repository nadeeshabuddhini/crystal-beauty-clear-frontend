import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

const supabase = createClient(
    "https://cldlxamjzpxvmndcwvat.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZGx4YW1qenB4dm1uZGN3dmF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzg1NDksImV4cCI6MjA1OTc1NDU0OX0.RhUmbKjhjipMt-cOB39osP2lyFIKN-a8Iv_yBL75l6w");

export default function uploadMedia(file) {
    const promise = new Promise(
        (resolve, reject)=>{
        if(file == null){
            reject("no file selected");
        }else{
            const timeStamp = new Date().getTime();
            const fileName = timeStamp + file.name;

            supabase.storage.from("images").upload(fileName, file, {
                cacheControl:"3600",
                upsert:false
            }).then(
                ()=>{
                    const url =supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(url);
                }
            ).catch(
                (err)=>{
                    toast.error("File upload failed");
                    console.log(err);
                }
            )
        }
    } 
    )
    return promise;
}



    

