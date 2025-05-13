'use client'
import axiosInstance from '../config/axiosConfig'
import React, { useEffect, useState } from 'react'
function Contact() {
  
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axiosInstance.get('/contacts')
        setData(res.data)
      } catch (err) {
        console.error("Error fetching contacts:", err)
      }
    }
  
    fetchContacts()
  }, [])
  

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4 text-red-500">Contact List</h1>

      <ul className="space-y-3">

  {data.map((contact, index) => (

    <li key={contact._id} className="border p-4 rounded shadow">
    
      <p><strong>Name:</strong> {contact.name}</p>

      <p><strong>Email:</strong> {contact.email}</p>

      <p><strong>Phone:</strong> {contact.phone}</p>

    </li>

  ))}

</ul>


    </div>
  )
}

export default Contact
