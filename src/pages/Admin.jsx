import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
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
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/admin">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/products">
                    Quản lý sản phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">
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
              <h1 className="h2">Dashboard</h1>
            </div>

            <h2>Quản lý người dùng</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name.firstname}</td>
                      <td>{user.name.lastname}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Quản lý sản phẩm</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(product => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Quản lý giỏ hàng</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Cart ID</th>
                    <th>User ID</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map(cart => (
                    <tr key={cart.id}>
                      <td>{cart.id}</td>
                      <td>{cart.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Admin;