import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const productAllData =async()=>{
        const result = await axios.get('https://green-cart-backend-onep.onrender.com/router/products')
        setProducts(result.data)
    }
    productAllData()
  },[])


  //  toggle handler
  // i still didnt create instock properly
  const handleToggle = (index) => {
    const copy = [...products];
    copy[index] = {
      ...copy[index],
      inStock: !copy[index].inStock,
    };

    setProducts(copy);

    if (copy[index].inStock) {
      console.log('its true');
    } else {
      console.log('its false');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">All Products</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 flex items-center gap-2">
                <img src={item.image} alt="img" className="w-12 h-12 border" />
                <span>{item.name}</span>
              </td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">${item.offerPrice}</td>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={item.inStock}
                  onChange={() => handleToggle(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
