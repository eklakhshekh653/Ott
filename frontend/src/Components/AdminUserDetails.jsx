import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUserDetails.css'; 
import api from '../Roter/api';

function AdminUserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/ott/customers/api/get-all-customer')
      .then((response) => {
        const sortedUsers = response.data.map((user) => ({
          ...user,
          address: Array.isArray(user.address) 
            ? user.address.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) 
            : [],
        }));
        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  
  


  return (
    <div className="admin-users">
      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user.userId}>
            <div className="user-info">
              <h3>User Details</h3>
              <p>User ID: {user.userId}</p>
              <p>Email: {user.email}</p>
              <p>Name: {user.firstName} {user.lastName}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <p>Register Time: {user.registerTime}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminUserDetails;
