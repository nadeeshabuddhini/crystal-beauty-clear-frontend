import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleRegister() {
        if (!email || !firstName || !lastName || !password || !confirmPassword || !phone) {
            toast.error("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user", {
            email,
            firstName,
            lastName,
            password,
            phone
        }).then((res) => {
            console.log("registration success", res.data);
            toast.success("Registration successful");
            navigate("/login");
            setLoading(false);
        }).catch((err) => {
            console.log("registration failed", err.response?.data);
            toast.error(err.response?.data?.message || "Registration failed");
            setLoading(false);
        });
    }

    return (
        <div className="w-full h-screen bg-[url(/loginbg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[350px] h-auto py-8 backdrop-blur-xl shadow-xl rounded-xl flex justify-center items-center flex-col">
                    <input onChange={(e) => setFirstName(e.target.value)} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="text" placeholder="First Name" />
                    <input onChange={(e) => setLastName(e.target.value)} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="text" placeholder="Last Name" />
                    <input onChange={(e) => setEmail(e.target.value)} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Password" />
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Confirm Password" />
                    <input onChange={(e) => setPhone(e.target.value)} className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="text" placeholder="Phone Number" />
                    <button onClick={handleRegister} className="w-[250px] h-[40px] bg-green-600 rounded-xl cursor-pointer">
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p className="text-gray-600 mt-5">
                        Already have an account? &nbsp;
                        <span className="text-green-400 hover:text-green-600">
                            <Link to={"/login"}>Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
