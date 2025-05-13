'use client'
 import axiosInstance from '../config/axiosConfig'
import React, { useEffect, useState } from 'react'
import UserCrud from '@/components/UserCrud'
import ProductList from '@/components/ProductList'

function Product() {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products') 
        setData(res.data)
      } catch (err) {
        console.error("Error fetching products:", err)
      }
    }

    fetchProducts()
  }, [])

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
          </li>
        ))}
      </ul>


  <UserCrud />
  <  ProductList />
    </div>
  )
}


export default Product
