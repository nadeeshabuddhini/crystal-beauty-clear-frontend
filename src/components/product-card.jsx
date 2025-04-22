import { Link } from "react-router-dom";

export default function ProductCard(props){
    const product = props.product;
    console.log(product);

    return(
        <Link to={"/overview/"+product.productId} className="w-[250px] h-[350px] m-4 shadow-2xl">
            <img className="w-full h-[230px] object-cover" src={product.images[0]}/>
            <div className="w-full h-[120px] flex flex-col justify-center px-4">
                <p className="text-gray-400 text-sm">{product.productId}</p>
                <p className="font-bold">{product.name}</p>
                <p className="text-pink-600">{product.price.toFixed(2)} <span className="line-through text-sm text-gray-400">
                    {product.price<product.labeledPrice&&product.labeledPrice.toFixed(2)}</span></p>
            </div>
        </Link>
    )
}