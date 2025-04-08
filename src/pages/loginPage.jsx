import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        console.log("Email: ", email);
        console.log("Password:", password);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login", {
            email:email,
            password:password
        }).then((res)=>{
            console.log("login success",res.data);
            toast.success("Login successful");
            localStorage.setItem("token", res.data.token);

            const user = res.data.user;
            if(user.role === "admin") {
                navigate("/admin/");
            }else{
                navigate("/");
            }
        }).catch((err)=>{
            console.log("login failed",err.response.data);
            toast.error(err.response.data.message || "Login failed");
        })
    }
    return(
        <div className="w-full h-screen bg-[url(/loginbg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center ">
                <div className="w-[350px] h-[450px] backdrop-blur-xl shadow-xl rounded-xl flex justify-center items-center flex-col">
                    <input onChange={(e)=>{setEmail(e.target.value)}} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="Email"/>
                    <input onChange={(e)=>{setPassword(e.target.value)}} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Password"/>
                    <button type="submit" onClick={handleLogin} className="w-[250px] h-[40px] bg-green-600 rounded-xl cursor-pointer">Login</button>
                </div>
            </div>
        </div>
    )
}