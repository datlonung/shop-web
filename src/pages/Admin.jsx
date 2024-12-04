import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchData();
      fetchUsers();
      fetchCarts();
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json();
    setData(result);
  };

  const fetchUsers = async () => {
    const response = await fetch('https://fakestoreapi.com/users');
    const result = await response.json();
    setUsers(result);
  };


  const fetchCarts = async () => {
    const response = await fetch('https://fakestoreapi.com/carts');
    const result = await response.json();
    setCarts(result);
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Trang Admin</h1>
        <hr />
        <div className="my-5">
          <h2 className="mb-4">Quản lý sản phẩm</h2>
          <div className="text-center mb-4">
            <Link to="/admin/products" className="btn btn-primary">Đi tới quản lý sản phẩm</Link>
          </div>
          <div className="row">
            {data.map(item => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="my-5">
          <h2 className="mb-4">Quản lý người dùng</h2>
          <div className="text-center mb-4">
            <Link to="/admin/users" className="btn btn-primary">Đi tới quản lý người dùng</Link>
          </div>
          <div className="row">
            {users.map(user => (
              <div key={user.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{user.name.firstname} {user.name.lastname}</h5>
                    <p className="card-text">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-5">
          <h2 className="mb-4">Quản lý giỏ hàng</h2>
          <div className="text-center mb-4">
            <Link to="/admin/carts" className="btn btn-primary">Đi tới quản lý giỏ hàng</Link>
          </div>
          <div className="row">
            {carts.map(cart => (
              <div key={cart.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Cart ID: {cart.id}</h5>
                    <p className="card-text">User ID: {cart.userId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default Admin;