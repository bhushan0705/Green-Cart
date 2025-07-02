import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../src/assets/logo.svg";
import profile from "../../src/assets/profile_icon.png";
import CartItem from "./CartItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts, filterProducts } from "../Redux/slices/filterProduct";

const Navbar = () => {
  const dispatch = useDispatch();
  const { all: products } = useSelector((state) => state.filterProduct);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith("/seller");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/");
  };

  function handleSeller() {
    setTimeout(() => {
      navigate("/seller-login");
    }, 2000);
  }

  useEffect(() => {
    if (products.length === 0) {
      axios
        .get("http://localhost:8080/router/products")
        .then((res) => dispatch(setAllProducts(res.data)))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [products.length, dispatch]);

  function searchBar(e) {
    const searchedValue = e.target.value;
    setSearch(searchedValue);
    dispatch(filterProducts(searchedValue));
    // ✅ Don't navigate if you're already on /allproducts
    if (location.pathname !== "/allproducts") {
      navigate("/allproducts");
    }
  }

  return (
    <nav className="border-b border-gray-300 bg-white px-4 md:px-10 lg:px-20 py-5 relative w-full">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4">
          <Link to="/" onClick={() => setOpen(false)}>
            <img className="h-9" src={logo} alt="Logo" />
          </Link>

          {!user && !isSellerRoute && (
            <button
              className="text-xs sm:text-sm border border-black/40 rounded-xl px-3 py-1 text-black/60 ml-10"
              onClick={handleSeller}
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {isSellerRoute ? (
          <div className="hidden md:flex items-center justify-between ml-auto gap-6">
            <p className="text-gray-600">Hi! Admin</p>
            <button
              className="border rounded-full text-sm px-4 py-1"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <Link to="/" className="text-l" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link
              to="/allproducts"
              className="text-l"
              onClick={() => setOpen(false)}
            >
              All Products
            </Link>
            {user && (
              <Link to="/my-order" className="text-sl">
                My Orders
              </Link>
            )}

            <div className="flex items-center border border-gray-300 rounded-full px-3">
              <input
                className="py-1.5 w-40 md:w-60 bg-transparent outline-none placeholder-gray-500 text-sm"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={searchBar}
              />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10.836 10.615L15 14.695"
                  stroke="#7A7B7D"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  clipRule="evenodd"
                  d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                  stroke="#7A7B7D"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                <path
                  d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                  stroke="#615fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <CartItem />
            </div>

            {!user ? (
              <button
                className="text-sm px-4 py-1.5 bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white rounded-full"
                onClick={() => navigate("/client-login")}
              >
                Login
              </button>
            ) : (
              <div className="relative group inline-block">
                <img
                  src={profile}
                  alt="profile_pic"
                  className="h-9 w-9 cursor-pointer rounded-full"
                />
                <ul
                  className="absolute top-full right-0 bg-white shadow-md border border-gray-200 py-2 w-32 rounded-md text-sm z-40
      opacity-0 translate-y-2 pointer-events-none
      group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
      transition-all duration-300 ease-in-out"
                >
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("my-order")}
                  >
                    My Orders
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          className="md:hidden text-2xl ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Toggle mobile menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {open && !isSellerRoute && (
        <div className="md:hidden w-full bg-white shadow-md py-4 flex flex-col items-start gap-4 px-5 text-sm z-50">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/allproducts" onClick={() => setOpen(false)}>
            All Products
          </Link>
          <input
            className="py-1.5 w-40 md:w-60 bg-transparent border-1 rounded-3xl text-start px-3 outline-none placeholder-gray-500 text-sm"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={searchBar}
          />
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <CartItem />
          </div>
          {user && (
            <Link to="/orders" onClick={() => setOpen(false)}>
              My Orders
            </Link>
          )}
          {!user ? (
            <button
              className="px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
              onClick={() => {
                setOpen(false);
                navigate("/client-login");
              }}
            >
              Login
            </button>
          ) : (
            <button
              className="px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
