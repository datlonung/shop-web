import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', name: { firstname: '', lastname: '' } });
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://fakestoreapi.com/users');
    const result = await response.json();
    setUsers(result);
  };

  const handleCreateOrUpdateUser = async () => {
    const url = editingItemId ? `https://fakestoreapi.com/users/${editingItemId}` : 'https://fakestoreapi.com/users';
    const method = editingItemId ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    const result = await response.json();
    if (editingItemId) {
      setUsers(users.map(user => (user.id === editingItemId ? result : user)));
      toast.success('User updated successfully!');
    } else {
      setUsers([...users, result]);
      toast.success('User created successfully!');
    }
    setNewUser({ email: '', name: { firstname: '', lastname: '' } });
    setEditingItemId(null);
  };

  const handleEditClick = (user) => {
    setNewUser(user);
    setEditingItemId(user.id);
  };

  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/users/${id}`, {
      method: 'DELETE'
    });
    setUsers(users.filter(user => user.id !== id));
    toast.success('User deleted successfully!');
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Manage Users</h1>
        <hr />
        <div className="row">
          <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="First Name" value={newUser.name.firstname} onChange={(e) => setNewUser({ ...newUser, name: { ...newUser.name, firstname: e.target.value } })} />
          </div>
          <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Last Name" value={newUser.name.lastname} onChange={(e) => setNewUser({ ...newUser, name: { ...newUser.name, lastname: e.target.value } })} />
          </div>
          <div className="col-md-12 mb-3">
            <input type="email" className="form-control" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          </div>
          <div className="col-md-12 text-center">
            <button className="btn btn-success btn-lg" onClick={handleCreateOrUpdateUser}>
              {editingItemId ? 'Update User' : 'Create User'}
            </button>
          </div>
        </div>

        <div className="my-5">
          <h2 className="mb-4">Users List</h2>
          <div className="row">
            {users.map(user => (
              <div key={user.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{user.name.firstname} {user.name.lastname}</h5>
                    <p className="card-text">{user.email}</p>
                    <button className="btn btn-primary me-2" onClick={() => handleEditClick(user)}>Update</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default UsersAdmin;