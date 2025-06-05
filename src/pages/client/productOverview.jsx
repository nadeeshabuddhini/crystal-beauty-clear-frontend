import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";

export default function ProductOverview() {
    const [product, setProduct] = useState({});
    const [status, setStatus] = useState("loading");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        setProduct(res.data.product);
                        setStatus("loaded");
                    }
                ).catch(
                    ()=> {
                        toast.error("Product is unavailable");
                        setStatus("error");
                    }
                )

            }
        },[status]
    )
    console.log(params.id)
    return(
        <div className="w-full h-full">
            {
                status == "loading"&&<Loader/>
            }
            {
                status == "loaded"&&
                <div className="w-full h-full flex">
                <div className="w-[50%] h-full">
                    <ImageSlider images={product.images}/>
                </div>
                <div className="w-[50%] h-full p-[40px]">
                    <h1 className="text-3xl font-bold text-center mb-[40px]">{product.name}{" | "}
                        <span className="text-2xl font-semibold text-gray-500 text-center">{product.altNames.join(" | ")}</span>
                    </h1>
                   
                    <div className="w-full flex justify-center mb-[40px]">
                        {
                            product.labeledPrice>product.price?(
                            <>
                            <h2 className="text-xl mr-[20px]">LKR: {product.price.toFixed(2)}</h2>
                            <h2 className="text-xl line-through text-gray-500">LKR: {product.labeledPrice.toFixed(2)}</h2>
                            </>
                            ):<h2 className="text-xl">LKR: {product.price.toFixed(2)}</h2>
                        }
                    </div>
                    <p className="text-lg text-center text-gray-500 mb-[40px]">{product.description}</p>
                    <div className="w-full flex justify-center mb-[40px] space-x-4">
                        <button className="bg-pink-800 border cursor-pointer border-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800"
                        onClick={()=>{
                            addToCart(product, 1);
                            toast.success("Added to cart successfully");
                            console.log(getCart());
                        }}>Add to Cart</button>
                        <button 
                        className="bg-pink-800 border cursor-pointer border-pink-800 text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-pink-800"
                        onClick={()=>{
                            navigate("/checkout", {state: {items:[
                                {
                                    productId: product.productId,
                                    name: product.name,
                                    altNames: product.altNames,
                                    price: product.price,
                                    labeledPrice: product.labeledPrice,
                                    image: product.images[0],
                                    quantity: 1
                                }
                            ]}})
                        }}>
                        Buy Now</button>
                    </div>
                </div>
                </div>
            }
            {
                status == "error"&&<div> ERROR</div>
            }
        </div>
    )
}