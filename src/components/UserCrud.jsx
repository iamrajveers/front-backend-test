"use client"
import React, { useState, useEffect } from 'react';
function UserCrud() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      {/* Render user list */}
    </div>
  );
}

export default UserCrud;
