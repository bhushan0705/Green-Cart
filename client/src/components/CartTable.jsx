import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../Redux/slices/ItemSlice';
import { toast } from 'react-toastify';


const CartTable = ({ cartItems }) => {
  const dispatch = useDispatch();
  
  return (
    <div className="lg:w-3/5 w-full bg-blue-100/60 shadow rounded-lg p-5">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-gray-700">
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Qty</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-3 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded border" />
                <span className="font-medium text-gray-800">{item.name}</span>
              </td>
              <td className="p-3 text-gray-700">${item.price * item.quantity}</td>
              <td className="p-3 text-gray-700">{item.quantity}</td>
              <td className="text-center space-x-4">
                <button
                  onClick={() => {
                    dispatch(increaseQuantity(item._id));
                    toast.success("Increased quantity");
                  }}
                  className="px-5 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    dispatch(decreaseQuantity(item._id));
                    toast.warning("Decreased quantity");
                  }}
                  className="px-5 py-1 lg:mt-0 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    dispatch(removeItem(item._id));
                    toast.error(`${item.name} removed`);
                  }}
                  className="px-5 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
