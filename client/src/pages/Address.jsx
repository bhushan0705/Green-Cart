

import React, { useState } from 'react';
import add_address from '../assets/add_address_image.svg';
import { useDispatch } from 'react-redux';
import { saveAddress } from '../Redux/slices/addressSlice';
import { useNavigate } from 'react-router-dom';


const Address = () => {
  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    countryCode: '',
    phone: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,[name]: value}));
  }

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(saveAddress(formData));
    navigate('/cart');
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-10 bg-gray-50">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Shipping <span className="text-indigo-600">Address</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="styled-input" required/>
            <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className="styled-input" required />
          </div>

          <div className="mb-4">
            <input type="text" placeholder="Street" name="street" value={formData.street} onChange={handleChange} className="styled-input w-full" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} className="styled-input" required/>
            <input type="text" placeholder="State" name="state" value={formData.state} onChange={handleChange} className="styled-input" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input type="number" placeholder="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} className="styled-input" required/>
            <input type="number" placeholder="Country Code" name="countryCode" value={formData.countryCode} onChange={handleChange} className="styled-input" required/>
          </div>

          <div className="mb-6">
            <input type="number" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} className="styled-input w-full" required/>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition duration-200 font-medium shadow">
            SAVE ADDRESS
          </button>
        </form>
      </div>

      <div className="mt-10 lg:mt-0 lg:ml-12">
        <img src={add_address} alt="Add Address" className="max-w-md w-full" />
      </div>
    </div>
  );
};

export default Address;
