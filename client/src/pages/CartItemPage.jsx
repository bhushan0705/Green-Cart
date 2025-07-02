import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import CartTable from '../components/CartTable';
import axios from 'axios';

const CartItemPage = () => {
  const cartItems = useSelector((state) => state.cartItem.cartItems);
  const userAddresss = useSelector((state) => state.address.shippingAddress);
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(totalPrice * 0.02);
  const totalAmount = totalPrice + tax;

  const fallbackAddress = {
    firstName: 'Peter',
    lastName: 'Parker',
    street: '123 Main St',
    city: 'New York',
    state: 'US',
    zipCode: '12345',
    countryCode: 'US',
    phone: '1234567890'
  };

  const [address, setAddress] = useState(userAddresss.length > 0 ? userAddresss : [fallbackAddress]);
  const [selectedAddress, setSelectedAddress] = useState(userAddresss[0] || fallbackAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [payment, setPayment] = useState('COD');

  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr);
    setShowAddress(false);
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  async function handleOrder() {
    if (!user) {
      toast.error("You must be logged in to place an order.");
      return;
    }
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const orderData = {
        cartItems,
        address: selectedAddress,
        paymentMethod: payment,
        totalAmount,
      };

      const res = await axios.post('http://localhost:8080/api/order/place', orderData);

      if (res.status === 201) {
        toast.success('Order placed successfully!');
        setTimeout(() => navigate('/my-order'), 2000);
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error(error);
    }
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <ToastContainer position="top-right" style={{ top: '80px' }} autoClose={2000} />
      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex items-center gap-4 mb-4 max-md:flex-col max-md:items-start'>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">🛒 Shopping Cart</h2>
          <p className="text-green-600 text-sm md:text-base">{totalQuantity} item(s)</p>
        </div>
        <div className='mb-4 max-md:w-full max-md:text-right'>
          <Link to='/' className="group cursor-pointer inline-flex items-center text-green-300 space-x-1">
            <i className="fa-solid fa-arrow-left mr-2 transition-transform duration-300 group-hover:-translate-x-2"></i>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <CartTable cartItems={cartItems} />

        {/* Order Summary + Address Picker */}
        <div className="w-full lg:max-w-[360px] bg-gray-100/40 p-5 border border-gray-300/70 rounded-md">
          <h2 className="text-lg md:text-xl font-medium">Order Summary</h2>
          <hr className="border-gray-300 my-4" />

          <div className="mb-6">
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-500 text-sm w-[80%]">
                {selectedAddress
                  ? `${selectedAddress.firstName} ${selectedAddress.lastName}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zipCode}, ${selectedAddress.countryCode}, ${selectedAddress.phone}`
                  : 'No address selected'}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-indigo-500 hover:underline text-sm"
              >
                Change
              </button>

              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10 max-h-48 overflow-y-auto">
                  {address.map((addr, idx) => (
                    <p
                      key={idx}
                      onClick={() => handleAddressSelect(addr)}
                      className="text-gray-700 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {addr.firstName} {addr.lastName}, {addr.street}, {addr.city}
                    </p>
                  ))}
                  <p
                    onClick={() => navigate('/address')}
                    className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>

            {userAddresss.length === 0 && (
              <p className="text-red-500 text-xs mt-2">
                No saved address found. Using a temporary default.
              </p>
            )}

            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
            <select
              value={payment}
              onChange={handlePaymentChange}
              className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none text-sm"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-300" />
          <div className="text-gray-500 mt-4 space-y-2 text-sm">
            <p className="flex justify-between"><span>Price</span><span>${totalPrice}</span></p>
            <p className="flex justify-between"><span>Shipping Fee</span><span className="text-green-600">Free</span></p>
            <p className="flex justify-between"><span>Tax (2%)</span><span>${tax}</span></p>
            <p className="flex justify-between text-base font-medium mt-3"><span>Total Amount:</span><span>${totalAmount}</span></p>
          </div>

          <button
            className="w-full py-3 mt-6 bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition text-sm rounded-md"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemPage;
