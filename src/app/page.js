'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersTable from '@/components/UserTable';
import Modal from '@/components/Modal';
export default function Home() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=10')
      .then((response) => {
        setUsers(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);


  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <UsersTable users={users} onImageClick={handleImageClick} />
      <Modal
        isOpen={isOpen}
        imageUrl={selectedImage}
        onClose={() => setIsOpen(false)}
        title={'Images'}
      />
    </div>
  );
}


