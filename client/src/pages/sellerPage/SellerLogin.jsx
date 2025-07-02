import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerLogin = () => {
    const [email, setEmail] =useState("admin@ac.in");
    const [password, setPassword] =useState("admin@123");

    const navigate = useNavigate()
    function handleAdminSumbit(e){
        e.preventDefault()
        if(email === "admin@ac.in" && password === "admin@123"){
            navigate('/seller')
        }
        else{
            alert("Invalid Email or Password")
        }
    }


    return (
        <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white" onSubmit={handleAdminSumbit}>
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> Login
            </p>
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="enter your mail" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required readOnly />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required readOnly/>
            </div>

            <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">Login
                {/* {state === "register" ? "Create Account" : "Login"} */}
            </button>
        </form>
    );
};

export default SellerLogin