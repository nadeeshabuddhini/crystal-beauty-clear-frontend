export default function LoginPage() {
    return(
        <div className="w-full h-screen bg-[url(/loginbg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center ">
                <div className="w-[350px] h-[450px] backdrop-blur-xl shadow-xl rounded-xl flex justify-center items-center flex-col">
                    <input className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="Email"/>
                    <input className="w-[250px] h-[40px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Password"/>
                    <button className="w-[250px] h-[40px] bg-green-600 rounded-xl cursor-pointer">Login</button>
                </div>
            </div>
        </div>
    )
}