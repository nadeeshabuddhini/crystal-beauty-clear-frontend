import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (res)=>{
                    console.log(res.data);
                    setProducts(res.data);
                })
        },[])

    
    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to="/admin/addProduct" className="text-gray-300 bg-gray-700 p-[12px] rounded-full cursor-pointer absolute right-5 bottom-5 hover:text-gray-700 hover:bg-gray-300">
                <FaPlus/>
            </Link>
            
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(
                        (product,id)=>{
                            return(
                                <tr key={id} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-500 hover:text-white">
                                    <td className="p-2">{product.productId}</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2">{product.labeledPrice}</td>
                                    <td className="p-2">{product.stock}</td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </table>
        </div>
        
    )
}