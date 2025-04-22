import { Link, Routes, Route } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import ProductPage from "./admin/product";
import AddProduct from "./admin/addProduct";
import EditProduct from "./admin/editProduct";

export default function AdminPage() {
    return(
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="w-[250px] h-full flex flex-col">
                <Link to={"/admin/users"} className="p-2 flex items-center"><FaUsers className="mr-2"/>Users</Link>
                <Link to={"/admin/products"} className="p-2 flex items-center"><FaWarehouse className="mr-2"/>Products</Link>
                <Link to={"/admin/orders"} className="p-2 flex items-center"><FaFileInvoice className="mr-2"/>Orders</Link>
            </div>
            <div className="w-[calc(100vw-250px)] h-full bg-white rounded-lg">
                <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/addProduct" element={<AddProduct/>} />
                    <Route path="/editProduct" element={<EditProduct/>}/>
                </Routes>
            </div>
        </div>
    );
}