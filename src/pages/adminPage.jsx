import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import ProductPage from "./admin/product";
import AddProduct from "./admin/addProduct";
import EditProduct from "./admin/editProduct";
import AdminOrder from "./admin/adminOrder";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminPage() {
    const [userValidated, setUserValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("Please login first to access admin page");
            navigate("/login");
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/user/current", {
                headers:{
                    "Authorization":"Bearer "+token,
                },
            }).then((res)=>{
                if(res.data.user.role === "admin"){
                    setUserValidated(true);
                }else{
                    toast.error("you are not an admin")
                    navigate("/login");
                }    
            }).catch((err)=>{
                toast.error("Something went wrong. Please try again later.");
                navigate("/login");
                console.error(err);
            })
        }
        
    },[])
    return(
        <div className="w-full h-screen bg-gray-200 flex p-2">
            {userValidated ?(
                <>
            <div className="w-[250px] h-full flex flex-col">
                <Link to={"/admin/users"} className="p-2 flex items-center"><FaUsers className="mr-2"/>Users</Link>
                <Link to={"/admin/products"} className="p-2 flex items-center"><FaWarehouse className="mr-2"/>Products</Link>
                <Link to={"/admin/orders"} className="p-2 flex items-center"><FaFileInvoice className="mr-2"/>Orders</Link>
            </div>
            <div className="w-[calc(100vw-250px)] h-full bg-white rounded-lg">
                <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/orders" element={<AdminOrder/>} />
                    <Route path="/addProduct" element={<AddProduct/>} />
                    <Route path="/editProduct" element={<EditProduct/>}/>
                </Routes>
            </div>
            </>
            ):(
                <Loader/>
            )}
        </div>
    );
}