export default function ProductCard(props){
    return(
        <div className="bg-red-900">
            <h1>{props.name}</h1>
            <p>{props.price}</p>
        </div>
    )
}