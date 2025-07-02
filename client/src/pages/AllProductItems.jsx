import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../Redux/slices/ItemSlice";
import { setAllProducts } from "../Redux/slices/filterProduct";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AllProductItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.filterProduct.filtered);
  const all = useSelector((state) => state.filterProduct.all);

  useEffect(() => {
    if (all.length === 0) {
      axios
        .get("https://green-cart-backend-onep.onrender.com/router/products")
        .then((res) => dispatch(setAllProducts(res.data)))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [all.length, dispatch]);

  if (!products || products.length === 0)
    return <p className="text-center mt-10">No products found.</p>;

  function handleItemClick(item) {
    navigate(`/products/${item.category}/${item._id}`);
  }

  function handleAddToCart(item) {
    dispatch(addItem(item));
    toast.success(`${item.name} added to cart!`);
  }

  function goBack() {
    window.history.back();
  }

  return (
    <div className="w-full">
      <ToastContainer
        position="top-right"
        style={{ top: "80px" }}
        autoClose={2000}
      />
      <div className="px-20 py-10">
        <div className="flex items-center justify-between w-[100%] mb-5">
          <h2 className="text-3xl font-bold">All Products</h2>
          <p
            className="group cursor-pointer inline-flex items-center text-green-300 space-x-1"
            onClick={goBack}
          >
            <i className="fa-solid fa-arrow-left mr-2 transition-transform duration-300 group-hover:-translate-x-2"></i>
            Back to previous page
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((item) => (
            <div
              key={item.id || item._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white cursor-pointer"
            >
              <img
                src={item.image}
                onClick={() => handleItemClick(item)}
                alt={item.name}
                className="h-40 object-cover rounded-md mb-3 transition-transform duration-300 hover:scale-105"
              />
              <p className="font-medium text-lg text-gray-700 break-words w-full line-clamp-2">
                {item.name}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-green-600 font-semibold">
                    ${item.offerPrice}
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    ${item.price}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-200 text-white px-3 py-2 text-sm rounded-md hover:bg-green-400 transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-cart-plus text-green-700"></i>
                  <p className="text-green-700">Add</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProductItems;
