import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function ProductOverview() {
    const [product, setProduct] = useState({});
    const [status, setStatus] = useState("loading");
    const params = useParams();

    useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        setProduct(res.data);
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
                <div> product loaded</div>
            }
            {
                status == "error"&&<div> ERROR</div>
            }
        </div>
    )
}