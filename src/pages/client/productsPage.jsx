import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import ProductCard from "../../components/product-card";

export default function ProductsPage() {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

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
    
    return(
       
        <div className="w-full h-full">

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