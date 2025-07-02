import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    category: '',
    inStock: true,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const data = new FormData();
    data.append('image', image);
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    setLoading(true);
    try {
      const res = await axios.post('https://green-cart-backend-onep.onrender.com/seller/upload', data);
      // console.log("✅ Product Uploaded:", res.data);
      alert("Product added successfully!");

      // Reset form
      setForm({
        name: '',
        description: '',
        price: '',
        offerPrice: '',
        category: '',
        inStock: true,
      });
      setImage(null);
    } catch (err) {
      console.error("❌ Upload Error:", err);
      alert("Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen px-4">
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 md:p-10 w-full max-w-lg shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>

        {/* Image Upload */}
        <div>
          <p className="text-base font-medium mb-1">Product Image</p>
          <label htmlFor="imageUpload" className="cursor-pointer inline-block">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              hidden
              onChange={handleImageChange}
              required
            />
            <img
              className="w-24 h-24 object-cover border-2 border-dashed border-indigo-300 rounded-md p-1 hover:scale-105 transition-transform duration-200"
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              alt="upload preview"
            />
          </label>
        </div>

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
        >
          <option value="">Select Category</option>
          {["Vegetables", "Fruits", "Drinks", "Instant", "Dairy", "Bakery", "Grains"].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Price & Offer Price */}
        <div className="flex gap-4">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            required
          />
          <input
            name="offerPrice"
            type="number"
            value={form.offerPrice}
            onChange={handleInputChange}
            placeholder="Offer Price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
