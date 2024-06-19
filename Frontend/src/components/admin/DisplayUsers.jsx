import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5001/test/users', {
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      setUsers(response.data);
      setError(null);
    }).catch(err => {
      setError('Failed to fetch users');
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      axios.get(`http://localhost:5001/test/users/${selectedUser._id}/accounts`, {
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        setUserDetails(Array.isArray(response.data) ? response.data : []);
        setError(null);
      }).catch(err => {
        setError('Failed to fetch user details');
        console.error(err);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [selectedUser]);

  const handleUserClick = (user) => {
    console.log("User clicked:", user); // Debug: Check if this logs when a user is clicked
    setSelectedUser(user);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: 'center' }}>Users List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.user_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p style={{ textAlign: 'center' }}>No users found.</p>}
      {selectedUser && (
        <div>
          <h2>{selectedUser.user_name}'s Accounts</h2>
          {selectedUser.accounts && selectedUser.accounts.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f4f4f4' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Account ID</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.accounts.map(accountId => (
                  <tr key={accountId}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{accountId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>No accounts found for this user.</p>}
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;
