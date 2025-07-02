import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addItem } from "../Redux/slices/ItemSlice";
import { toast, ToastContainer } from "react-toastify";

function ProductsPage() {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const location = useLocation();
    // const { category } = useParams();
  const products = location.state?.products || [];  // fallback/go back if no data passed

    // Add product to cart
    function handleAddToCart(item) {
      dispatch(addItem(item));  // Dispatch addToCart action
      toast.success(`${item.name} added to cart!`);
    }

      function handleItemClick(item) {
    // console.log(item, "clicked here");
    navigate(`/products/${item.category}/${item._id}`);
  }

  function goBack(){
    window.history.back();
  }



  return (
    <div className="w-full">
        <ToastContainer position="top-right" style={{ top: '80px' }}  autoClose={2000} />
      <div className="px-20 py-10">
        <div className="flex flex-col items-start justify-start gap-4 w-full">
          <div className="flex items-center justify-between w-[100%]">
          <p className="text-3xl text-black/80">{selectedProduct.text}</p>
       <p className="group cursor-pointer inline-flex items-center text-green-300 space-x-1" onClick={goBack}>
                   <i className="fa-solid fa-arrow-left mr-2 transition-transform duration-300 group-hover:-translate-x-2"></i>
                   Back to previous page
                 </p>
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap ">
          {
            products.map((element,index)=>
              <div className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white" key={index} onClick={()=>handleItemClick(element)}>
                <p>{element.name}</p>
                <img src={element.image} alt=""  className="h-40 object-cover rounded-md mb-3 transition-transform duration-300 hover:scale-105 " />
                 <p className="font-medium text-lg text-gray-700 break-words w-full line-clamp-2">
                      {element.name}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <p className="text-green-600 font-semibold">
                          ${element.offerPrice}
                        </p>
                        <p className="text-gray-400 line-through text-sm">
                          ${element.price}
                        </p>
                      </div>
                      <button className="bg-green-200 text-white px-3 py-2 text-sm rounded-md hover:bg-green-400 transition flex items-center gap-2"
                      onClick={() => handleAddToCart(element)}  // Add to Cart functionality
                      >
                        <i className="fa-solid fa-cart-plus text-green-700"></i>
                        <p className="text-green-700">Add</p>
                      </button>
                    </div>
              </div>
            )
          }
          </div>

          <p className="mt-6 text-gray-700">{selectedProduct.description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;
