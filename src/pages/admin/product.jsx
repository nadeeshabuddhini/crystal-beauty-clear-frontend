import axios from "axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (res)=>{
                        console.log(res.data);
                        setProducts(res.data);
                        setLoaded(true);
                    })
            }
            }
            ,[loaded])


    async function handleDelete(id) {
        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("Please login first to delete a product");
            return
        }
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {
                headers:{
                    "Authorization":"Bearer "+token,
                }
            })
            setLoaded(false);
            toast.success("Successfully deleted product");
        }catch(error){
            toast.error("Failed to delete product");
            return
        }
    }    
    
    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to="/admin/addProduct" className="text-gray-300 bg-gray-700 p-[12px] rounded-full cursor-pointer absolute right-5 bottom-5 hover:text-gray-700 hover:bg-gray-300">
                <FaPlus/>
            </Link>
            
            {loaded&&<table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(
                        (product,id)=>{
                            return(
                                <tr key={id} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-200">
                                    <td className="p-2">{product.productId}</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2">{product.labeledPrice}</td>
                                    <td className="p-2">{product.stock}</td>
                                    <td className="p-2">
                                        <div className="w-full h-full flex justify-center">
                                            <FaRegTrashAlt onClick={()=>{
                                                handleDelete(product.productId)
                                            }} className="text-[20px] m-[10px] hover:text-red-600"/>
                                            <TiPencil
                                            onClick={()=>{navigate("/admin/editProduct",
                                                {state:product}
                                            )}}
                                            className="text-[20px] m-[10px] hover:text-blue-600"/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </table>}
            {!loaded&&
                <Loader/>
}
        </div>
        
    )
}