import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

export default function EditProduct(){
    const navigate = useNavigate();
    const locationData = useLocation();
    console.log(locationData);
    if(locationData.state == null){
        toast.error("Please select a product to edit");
        window.location.href = "/admin/products";
    }

    const [productId, setProductId] = useState(locationData.state.productId);
    const [name, setName] = useState(locationData.state.name);
    const [altName, setAltName] = useState(locationData.state.altNames.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState(locationData.state.stock);
    

    async function handleSubmit(){
      
        const promisesArray = [];

        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i]);
            promisesArray[i] = promise;
            
        }
        try{
        let result = await Promise.all(promisesArray);
        if(result.length === 0){
            result = locationData.state.images;
        }
        
        const altNameArray = altName.split(",");
        const product={
            name:name,
            altName:altNameArray,
            price:price,
            labeledPrice:labeledPrice,
            description:description,
            images:result,
            stock:stock
        }
        const token = localStorage.getItem("token");
        await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId, product,{
            headers:{
                "Authorization":"Bearer "+token,
            }
        })
            toast.success("Product updated successfully");
            navigate("/admin/products");
              
     }catch(err){
            console.log(err);
            toast.error("Product updating failed");
        }
    }
    
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[400px] h-[500px] rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h1 className="text-3xl text-gray-700 font-bold mb-5">Edit Product</h1>

            <input disabled value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Product ID"/>

            <input value={name} onChange={(e)=>{setName(e.target.value)}} className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Product Name"/>

            <input value={altName} onChange={(e)=>{setAltName(e.target.value)}} className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Alternative Names"/>

            <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Price"/>

            <input value={labeledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}} type="number" className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Labaled Price"/>

            <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Description"/>

            <input onChange={(e)=>{setImages(e.target.files)}} type="file" multiple className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Upload images"/>

            <input value={stock} onChange={(e)=>{setStock(e.target.value)}} type="number" className="w-[250px] h-[40px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Stock"/>

            <div className="w-[250px] flex justify-between items-center mt-5">
                <Link to={"/admin/products"} className="bg-red-500 text-white w-[120px] rounded-lg p-2 hover:bg-red-700 text-center">Cancel</Link>
                <button onClick={handleSubmit} className="bg-green-500 w-[120px] text-white rounded-lg p-2 hover:bg-green-700 cursor-pointer">Edit Product</button>
            </div>
            </div>
        </div>
    )
}


//https://cldlxamjzpxvmndcwvat.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZGx4YW1qenB4dm1uZGN3dmF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzg1NDksImV4cCI6MjA1OTc1NDU0OX0.RhUmbKjhjipMt-cOB39osP2lyFIKN-a8Iv_yBL75l6w