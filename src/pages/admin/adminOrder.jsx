import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrder(){
    const [orders, setOrders] = useState([]);
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    const [modalDisplay, setModalDisplay] = useState(false);
    const [displayOrder, setDisplayOrder] = useState(null);

    useEffect(
        ()=>{
            if(!ordersLoaded){
                const token = localStorage.getItem("token");
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/order", {
                    headers:{
                        "Authorization":"Bearer "+token
                    }}
                ).then(
                    (res)=>{
                        setOrders(res.data);
                        setOrdersLoaded(true);
                        console.log(res.data);
                    }
                ).catch(
                    (err)=>{
                        console.error(err);
                        alert("Failed to load orders. Please try again later.")
                    }
                )    
            }
        },
        [ordersLoaded]
    );
    function changeOrderStatus(orderId, status) {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL+"/api/order/"+orderId, {status: status}, {
            headers:{
                "Authorization":"Bearer "+token
            }
        }).then(
            ()=>{
                toast.success("Order status updated successfully!");
                setOrdersLoaded(false);
            }
        ).catch(
            (err)=>{
                console.error(err);
                toast.error("Failed to update order status. Please try again later.");
            }
        )
    }
    return(
        <div className="w-full h-full">
            {
                ordersLoaded?
                <div className="w-full h-full">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2">Order ID</th>
                                <th className="p-2">Customer Email</th>
                                <th className="p-2">Customer Name</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Phone Number</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Total Price</th>
                                <th className="p-2">Date</th>
                                <th className="p-2"></th>  
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(
                                (order)=>{
                                    return(
                                        <tr key={order.orderId} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-200">
                                            <td className="p-2">{order.orderId}</td>
                                            <td className="p-2">{order.email}</td>
                                            <td className="p-2">{order.name}</td>
                                            <td className="p-2">{order.address}</td>
                                            <td className="p-2">{order.phoneNum}</td>
                                            <td className="p-2">
                                                <select value={order.status} className="z-[50]"
                                                onChange={(e)=>{changeOrderStatus(order.orderId, e.target.value)}}>
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="p-2">{order.total.toFixed(2)}</td>
                                            <td className="p-2">{new Date(order.date).toDateString()}</td>
                                            <td className="p-2">
                                                <button className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-500" 
                                                onClick={()=>{setModalDisplay(true), setDisplayOrder(order)}}>Details</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                    {
                        modalDisplay && <div className="fixed top-0 left-0 w-full h-full bg-[#00000070] flex justify-center items-center">
                            <div className="w-[600px] h-[600px] max-h-[600px] relative bg-white">
                                <div className="w-full h-[150px]">
                                    <h1 className="text-sm font-bold p-2">Order ID: {displayOrder.orderId}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Date: {new Date(displayOrder.date).toDateString()}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Status: {displayOrder.status}</h1>
                                    <h1 className="text-sm font-bold p-2">Total Price: {displayOrder.total.toFixed(2)}</h1>
                                </div>
                                <div className="w-full h-[450px] overflow-y-auto max-h-[450px]">
                                    {
                                        displayOrder.billItems.map((item, index)=>{
                                            return(
                                                <div key={index} className="w-full h-[100px] my-[5px] bg-white shadow-2xl flex justify-between items-center relative">
                                                    <img src={item.image} className="h-full aspect-square object-cover"/>
                                                    <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                                        <h1 className="text-xl font-bold">{item.productName}</h1>
                                                        <h2 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)}</h2>
                                                        <h2 className="text-lg text-gray-500">Quantity: {item.quantity}</h2>
                                                    </div>    
                                                </div>
                                            )
                                        })

                                    }
                                    
                                </div>
                                <button className="w-[40px] absolute h-[40px] right-[-20px] top-[-20px] rounded-full bg-white shadow shadow-black flex justify-center items-center cursor-pointer"
                                onClick={()=>{setModalDisplay(false)}}>
                                    <IoCloseSharp/>
                                </button>
                            </div>
                        </div>
                    }
                </div>
                :<Loader/>
            }
        </div>
    )
}
