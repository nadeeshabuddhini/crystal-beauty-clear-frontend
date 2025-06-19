import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData(){
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(()=>{
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/user/current", {
                headers:{
                    "Authorization":"Bearer "+token,
                },
            }).then((res)=>{
                setUser(res.data.user);
            }).catch((err)=>{
                console.error("Failed to fetch user data", err);
                setUser(null);
            })
        }
    },[])
    return (
        <>
        {user==null ?(
            <div className="h-full flex justify-center items-center flex-row">
                <Link to="/login" className="bg-pink-600 text-white px-4 py-2 rounded-lg">Login</Link>
                <Link to="/register" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg ml-4">Register</Link>
            </div>
        ):(
            <div className="h-full flex justify-center items-center flex-row">
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue"
                onClick={()=>{
                    localStorage.removeItem("token");
                    setUser(null);
                    window.location="/login";
                }}>Logout</button>
            </div>    

        )}
        </>
    )
}