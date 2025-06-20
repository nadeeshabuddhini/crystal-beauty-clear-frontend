import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [search,setSearch] = useState("");

    useEffect(
        ()=>{
            if(!productsLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (res)=>{
                        setProductList(res.data);
                        setProductsLoaded(true);
                    })
            }
        },
        [productsLoaded])
    
    function handleSearch() {
        if(search.length > 0){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/search/"+search).then(
                (res)=>{
                    setProductList(res.data.products);
                })
            
        }
    }
    return(
       
        <div className="w-full h-full">
            <div className="w-full h-[60px] flex justify-center items-center mb-4">
                <input type="text" placeholder="Search products..." className="w-[300px] h-[40px] rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                 value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={()=>{
                    handleSearch();
                }}>Search</button>
                <button className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={()=>{setProductsLoaded(false)}}>Reset</button>
            </div>
            {
                productsLoaded ?
                <div className="w-full h-full flex flex-wrap justify-center">
                    {productList.map(
                        (product,index)=>{
                            return(
                                    <ProductCard key={index} product={product}/>
                            )
                        }
                    )}
                </div>
                : <Loader/>
            }
        </div>
    )
}