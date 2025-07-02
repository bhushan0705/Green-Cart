import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://green-cart-backend-onep.onrender.com/api/order/place')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-20">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center py-20 text-gray-500">No orders yet.</p>;

  return (
    <div className="w-full px-4 py-5">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order, i) => (
        <div key={i} className="border p-4 sm:p-6 rounded-lg shadow mb-6 bg-white space-y-4">
          
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 break-words">Order #{order._id}</h2>
            <p className="text-sm text-gray-600">
              Payment: <span className="font-medium text-gray-800">{order.paymentMethod}</span>
            </p>
            <p className="text-sm font-medium text-gray-800">Total: ${order.totalAmount}</p>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            {order.cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4"
              >
                {/* Image and Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded bg-gray-100"
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Category: {item.category}</p>
                  </div>
                </div>

                {/* Quantity and Status */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>Quantity: {item.quantity}</p>
                  <p className="text-green-600 font-medium">Status: Order Placed</p>
                </div>

                {/* Price */}
                <div className="text-sm sm:text-base font-semibold text-gray-800">
                  <p><span className='text-green-500'>Amount:</span> ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
