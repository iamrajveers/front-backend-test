'use client'
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axiosInstance from '@/app/config/axiosConfig';

function ProductList() {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch products from API

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products');
        setData(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setData(data.filter(product => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };
  

  // Edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // View product
  const handleView = (product) => {
    setSelectedProduct(product);
    setIsEditing(false);
  };


  // Save edited product
  const handleSave = async () => {
    try {
      await axiosInstance.put(`/products/${selectedProduct.id}`, selectedProduct);
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id ? selectedProduct : item
        )
      );
      setSelectedProduct(null);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };
  
 return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Product List</h1>

      <ul className="space-y-3">
        {data.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>

            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleView(product)}
                className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
              >
                <FaEye /> <span>View</span>
              </button>
              <button
                onClick={() => handleEdit(product)}
                className="text-yellow-500 hover:text-yellow-700 flex items-center space-x-1"
              >
                <FaEdit /> <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:text-red-700 flex items-center space-x-1"
              >
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            {isEditing ? 'Edit Product' : 'Product Details'}
          </h2>

          {isEditing ? (
            <>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
                className="border p-2 w-full mb-2"
                placeholder="Product Name"
              />
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
                className="border p-2 w-full mb-2"
                placeholder="Price"
              />
              <textarea
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, description: e.target.value })
                }
                className="border p-2 w-full mb-2"
                placeholder="Description"
              />

              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Created At:</strong> {new Date(selectedProduct.created_at).toLocaleString()}</p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-4 bg-gray-300 text-black px-3 py-1 rounded"
              >
                Close

              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
