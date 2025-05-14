'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersTable from '@/components/UserTable';
import Modal from '@/components/Modal';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=5')
      .then((response) => {
        setUsers(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);



  const handleImageClick = (user) => {
    setSelectedUser(user);  
    setIsOpen(true);
  };



  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 border rounded w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <UsersTable users={filteredUsers} onImageClick={handleImageClick} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'User Details'}
        user={selectedUser}  
      />



    </div>
  );
}


