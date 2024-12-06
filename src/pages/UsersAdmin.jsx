import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    if (!newUser.email || !newUser.name || !newUser.name.firstname || !newUser.name.lastname) {
      toast.error('Please fill in all required fields.');
      return;
    }

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
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/products">
                    Quản lý sản phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/admin/users">
                    Quản lý người dùng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/carts">
                    Quản lý giỏ hàng
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Quản lý người dùng</h1>
            </div>

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
              <h2 className="mb-4">Danh sách người dùng</h2>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name.firstname}</td>
                        <td>{user.name.lastname}</td>
                        <td>{user.email}</td>
                        <td>
                          <button className="btn btn-primary me-2" onClick={() => handleEditClick(user)}>Update</button>
                          <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UsersAdmin;