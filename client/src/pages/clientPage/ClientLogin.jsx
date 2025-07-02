import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ClientLogin = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClientLogin = async (e) => {
    e.preventDefault();

    const url =
      state === "login"
        ? `https://green-cart-backend-onep.onrender.com/login`
        : `https://green-cart-backend-onep.onrender.com/signup`;

    const payload =
      state === "login" ? { email, password } : { name, email, password };

    try {
      const res = await axios.post(url, payload);

      // ✅ Login: Save user to localStorage and navigate
      if (state === "login" && res.status === 200) {
        const userData = res.data.user || res.data; // adjust based on your API
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      }

      // ✅ Signup
      if (state === "signup" && res.status === 200) {
        toast.success("Signup successful! Please login.");
        setState("login");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Signup/Login failed.");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-transparent"
      onSubmit={handleClientLogin}
    >
      <ToastContainer position="top-right" style={{ top: "80px" }} autoClose={2000} />

      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">User</span>{" "}
        {state === "login" ? "Login" : "Sign Up"}
      </p>

      {state === "signup" && (
        <div className="w-full">
          <p>Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="text"
            required
          />
        </div>
      )}

      <div className="w-full">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="password"
          required
        />
      </div>

      <p>
        {state === "signup" ? "Already have an account?" : "Create an account?"}{" "}
        <span
          onClick={() => setState(state === "signup" ? "login" : "signup")}
          className="text-indigo-500 cursor-pointer"
        >
          Click here
        </span>
      </p>

      <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
        {state === "signup" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default ClientLogin;
