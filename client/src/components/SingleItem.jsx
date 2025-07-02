import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../Redux/slices/ItemSlice';
import { toast, ToastContainer } from 'react-toastify';

function SingleItem() {
  const { id } = useParams(); // Get product ID from route
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/router/products`)
      .then(res => {
        const foundProduct = res.data.find(p => p._id === id);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);


  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (!product) return <p className="text-center py-20 text-red-500">Product not found</p>;



  function handleBuyNow(item) {
     dispatch(addItem(item));  // Dispatch addToCart action
    navigate('/cart');
  }


    function handleAddToCart(item) {
      dispatch(addItem(item));  // Dispatch addToCart action
      toast.success(`${item.name} added to cart!`);
    }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
              <ToastContainer position="top-right" style={{ top: '80px' }} autoClose={2000} />
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-600">
            <Link to="/" className="hover:underline">Home</Link> /{' '}
            <Link to="/allproducts" className="hover:underline">Products</Link> /{' '}
            <span className="text-green-600 font-semibold">{product.name}</span>
          </div>

          {/* Main content */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-96 h-96 object-cover rounded-lg shadow-lg"
            />

            {/* Details */}
            <div className="flex-1 flex flex-col gap-6">
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

              <div className="flex items-center gap-6">
                <span className="text-3xl font-extrabold text-green-600">${product.offerPrice}</span>
                <span className="line-through text-gray-400 text-xl">${product.price}</span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {product.description.map((element,index)=>
              <li key={index}>{element}</li>  
              )}
              </p>

              <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-800">{product.category}</span></p>

              {/* Buttons */}
              <div className="flex gap-6">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-gray-800 text-white py-3 px-8 rounded-md hover:bg-gray-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default SingleItem;
