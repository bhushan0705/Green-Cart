import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCategories,
  setDummyProducts,
  setSelectedProduct,
} from "../Redux/slices/productSlice";
import { categories, dummyProducts } from "../assets/assets";
import axios from "axios";

const CategoriesProduct = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCategoryClick = (category, element) => {
    axios
      .get(`https://green-cart-backend-onep.onrender.com/router/products`)
      .then((res) => {
        const allProducts = res.data;
        const filteredProducts = allProducts.filter(
          (item) => item.category === category
        );
        // console.log('Filtered Products:', filteredProducts);
        dispatch(setCategories(filteredProducts));
        dispatch(setSelectedProduct(element));
        navigate(`/products/${category}`, {
          state: { products: filteredProducts },
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    dispatch(setDummyProducts(dummyProducts));
  }, [dispatch]);

  return (
    <div className="px-20 py-20">
      <p className="text-3xl font-bold mb-5">Category</p>

      <div className="flex flex-wrap items-start justify-between gap-4">
        {categories.map((element, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(element.path, element)}
            tabIndex={0}
            className="flex items-center justify-center flex-col gap-2 h-60 md:w-35 w-[200px] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ${element.bgColor}"
            style={{ backgroundColor: element.bgColor }}
          >
            <img
              src={element.image}
              alt={element.text}
              className="h-30 w-35 object-contain transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <span className="text-sm font-medium text-center text-wrap w-20">
              {element.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesProduct;
