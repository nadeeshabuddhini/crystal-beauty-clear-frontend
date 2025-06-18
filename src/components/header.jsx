import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="w-full h-[70px] flex items-center justify-start lg:justify-center bg-accent relative">
            <RxHamburgerMenu className="text-3xl text-pink-600 mx-4 lg:hidden cursor-pointer" onClick={()=>{setIsOpen(true);}}/>
            <div className="w-[500px] h-full hidden lg:flex items-center justify-evenly text-pink-600 text-xl">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
                <Link to="reviews">Reviews</Link>
                <Link to="/cart" className="absolute right-[30px] text-3xl"><BsCart4/></Link>
            </div>
            {
                isOpen && (
                   <div className="fixed top-0 left-0 bg-[#00000080] w-full h-screen z-50 flex"> 
                    <div className="w-[300px] h-full bg-white flex flex-col justify-start items-start text-pink-600">
                        <RxHamburgerMenu className="text-3xl mx-4 mt-4 cursor-pointer lg:hidden" onClick={()=>{setIsOpen(false);}}/>
                        <Link to="/" className="p-4">Home</Link>
                        <Link to="/products" className="p-4">Products</Link>
                        <Link to="/contact" className="p-4">Contact</Link>
                        <Link to="/reviews" className="p-4">Reviews</Link>
                        <Link to="/cart" className="p-4">Cart</Link>
                    </div>
                   </div> 
                )
            }
        </div>
    )
}
