import { Link } from "react-router-dom"

export default function AddProduct(){
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[400px] h-[500px] rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h1 className="text-3xl text-gray-700 font-bold mb-5">Add Product</h1>
            <input className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Product ID"/>
            <input className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Product Name"/>
            <input className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Alternative Names"/>
            <input className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Price"/>
            <input className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Labaled Price"/>
            <textarea className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Description"/>
            <input className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Stock"/>

            <div className="w-[250px] flex justify-between items-center">
                <Link to={"/admin/products"} className="bg-red-500 text-white w-[120px] rounded-lg p-2 hover:bg-red-700 text-center">Cancel</Link>
                <button className="bg-green-500 w-[120px] text-white rounded-lg p-2 hover:bg-green-700 cursor-pointer">Add Product</button>
            </div>
            </div>
        </div>
    )
}