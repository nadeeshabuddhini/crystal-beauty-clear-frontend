import { TbTrash } from "react-icons/tb";
import {useState } from "react";
import { useNavigate,  useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout(){
    const location = useLocation();
    const [cart, setCart] = useState(location.state.items)
    const [cartRefreshed, setCartRefreshed] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    function getTotal(){
        let total = 0;
        cart.forEach((item)=>{
            total += item.price * item.quantity
        })
        return total
    }
    function getLabeledTotalPrice(){
        let total = 0;
        cart.forEach((item)=>{
            total += item.labeledPrice * item.quantity
        })
        return total
    }
    function placeOrder() {
        const orderData ={
            name: name,
            address: address,
            phoneNum: phoneNum,
            billItems:[]
        }
        for(let i=0; i<cart.length; i++){
            orderData.billItems[i]={
                productId: cart[i].productId,
                quantity: cart[i].quantity,
            }
        }
        
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        axios.post(import.meta.env.VITE_BACKEND_URL+ "/api/order", orderData, {
            headers:{
                Authorization: "Bearer "+token,
            },
           
        }).then(()=>{
            
            toast.success("Order placed successfully!");
            navigate("/");
        }).catch((err)=>{
            console.error(err);
            toast.error("Failed to place order. Please try again.");
        })
    }
    return(
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[500px]">
                {
                    cart.map((item, index)=>{
                        return(
                            <div key={index} className="w-full h-[100px] my-[5px] bg-white shadow-2xl flex justify-between items-center relative">
                                <button className="absolute bg-red-400 right-[-50px] p-[6px] rounded-full text-white flex justify-center items-center cursor-pointer" 
                                style={{ boxShadow: '0 4px 10px rgba(255, 0, 0, 0.6)' }}
                                onClick={()=>{
                                    const newCart = cart.filter((cartItem)=>cartItem.productId !== item.productId);
                                    setCart(newCart);
                                }}>
                                    <TbTrash/>
                                </button>
                                <img src={item.image} className="h-full aspect-square object-cover"/>
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-lg font-bold">{item.name}</h1>
                                    <p className="text-gray-500 text-sm">{item.altNames.join(" | ")}</p>
                                    <p className="text-gray-500 text-sm">LKR: {item.price.toFixed(2)}</p>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-2xl mx-[5px] w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer"
                                    onClick={()=>{
                                        const newCart = cart
                                        newCart[index].quantity -= 1;
                                        if(newCart[index].quantity <= 0) {
                                            newCart[index].quantity = 1; // Prevent negative quantity
                                        }
                                        setCart(newCart);
                                        setCartRefreshed(!cartRefreshed);
                                    }}>-</button>
                                    <h1 className="text-xl font-bold">{item.quantity}</h1>
                                    <button className="text-2xl mx-[5px] w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer"
                                    onClick={()=>{
                                        const newCart = cart
                                        newCart[index].quantity += 1;
                                        setCart(newCart);
                                        setCartRefreshed(!cartRefreshed);
                                    }}>+</button>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h1 className="text-lg">{(item.price*item.quantity).toFixed(2)}</h1>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Total</h1>
                    <h1 className="w-[100px] text-xl text-end pr-2">{getLabeledTotalPrice().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Discount</h1>
                    <h1 className="w-[100px] text-xl border-b-[2px] text-end pr-2">{(getLabeledTotalPrice()-getTotal()).toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Net Total</h1>
                    <h1 className="w-[100px] text-xl text-end border-b-[4px] border-double pr-2">{getTotal().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="text-xl pr-2">Name</h1>
                    <input type="text" className="w-[300px] h-[40px] border-2 border-gray-300 rounded-lg px-2 text-lg"
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="text-xl pr-2">Phone Number</h1>
                    <input type="text" className="w-[300px] h-[40px] border-2 border-gray-300 rounded-lg px-2 text-lg"
                    value={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}/>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="text-xl pr-2">Address</h1>
                    <input type="text" className="w-[300px] h-[40px] border-2 border-gray-300 rounded-lg px-2 text-lg"
                    value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div className="w-full flex justify-end mt-4">
                    <button className="w-[170px] text-xl text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer"
                    onClick={placeOrder}
                    >Place Order</button>
                </div>
            </div>
        </div>
    )
}