"use client"
import React from 'react';
function UsersTable({ users, onImageClick }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Photo</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">
                <img
                  src={user.picture.thumbnail}
                  alt="User"
                  className="w-12 h-12 rounded-full mx-auto cursor-pointer hover:scale-110 transition"
                  onClick={() => onImageClick(user.picture.large)}
                />
              </td>
              <td className="border px-4 py-2">
                {user.name.first} {user.name.last}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.location.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
