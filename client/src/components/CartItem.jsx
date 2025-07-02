import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartItem = () => {

    const cartItems = useSelector((state) => state.cartItem.cartItems);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0); // ✅ Total quantity

  const navigate = useNavigate();
  
  return (
    <div>
      <button
        className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center"
        onClick={() => navigate('/cart')}
      >
        {totalQuantity}
      </button>
    </div>
  );
};

export default CartItem;
