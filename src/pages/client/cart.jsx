import { TbTrash } from "react-icons/tb";
import getCart, { addToCart, getLabeledTotalPrice, getTotal, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage(){
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(cartLoaded == false){
            const cartData = getCart();
            setCart(cartData);
            setCartLoaded(true);
        }
    }, [cartLoaded])
    return(
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-full lg:w-[500px]">
                {
                    cart.map((item, index)=>{
                        return(
                            <div key={index} className="w-full p-4 lg:p-0 lg:h-[100px] my-[5px] bg-white shadow-2xl flex flex-col lg:flex-row justify-between items-center relative">
                                <button className="absolute bg-red-400 right-4 top-2 lg:right-[-50px] p-[6px] rounded-full text-white flex justify-center items-center cursor-pointer" 
                                style={{ boxShadow: '0 4px 10px rgba(255, 0, 0, 0.6)' }}
                                onClick={()=>{
                                    removeFromCart(item.productId);
                                    setCart(getCart());
                                }}>
                                    <TbTrash/>
                                </button>
                                <img src={item.image} className="h-[100px] lg:h-full aspect-square object-cover"/>
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden lg:items-start lg:ml-4 flex flex-col items-center p-2">
                                    <h1 className="text-lg font-bold">{item.name}</h1>
                                    <p className="text-gray-500 text-sm">{item.altNames.join(" | ")}</p>
                                    <p className="text-gray-500 text-sm">LKR: {item.price.toFixed(2)}</p>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-2xl mx-[5px] w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer"
                                    onClick={()=>{
                                        addToCart(item, -1);
                                        setCartLoaded(false);
                                    }}>-</button>
                                    <h1 className="text-xl font-bold">{item.quantity}</h1>
                                    <button className="text-2xl mx-[5px] w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer"
                                    onClick={()=>{
                                        addToCart(item, 1);
                                        setCartLoaded(false);
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
                <div className="w-full flex justify-end mt-4">
                    <button className="w-[170px] text-xl text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer"
                    onClick={()=>{navigate("/checkout",{ state:{items:cart}})
                    }}>Checkout</button>
                </div>
            </div>
        </div>
    )
}