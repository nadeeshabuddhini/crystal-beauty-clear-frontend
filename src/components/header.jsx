import { Link } from "react-router-dom";

export default function Header() {
    return(
        <div className="w-full h-[70px] flex items-center justify-center bg-gray-200">
            <div className="w-[500px] h-full flex items-center justify-evenly text-pink-600 text-xl">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
                <Link to="reviews">Reviews</Link>
            </div>
        </div>
    )
}
