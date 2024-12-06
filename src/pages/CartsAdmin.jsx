import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartsAdmin = () => {
  const [carts, setCarts] = useState([]);
  const [newCart, setNewCart] = useState({ userId: '', products: [] });
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    const response = await fetch('https://fakestoreapi.com/carts');
    const result = await response.json();
    setCarts(result);
  };

  const handleCreateOrUpdateCart = async () => {
    if (!newCart.userId || newCart.products.length === 0) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const url = editingItemId ? `https://fakestoreapi.com/carts/${editingItemId}` : 'https://fakestoreapi.com/carts';
    const method = editingItemId ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCart)
    });
    const result = await response.json();
    if (editingItemId) {
      setCarts(carts.map(cart => (cart.id === editingItemId ? result : cart)));
      toast.success('Cart updated successfully!');
    } else {
      setCarts([...carts, result]);
      toast.success('Cart created successfully!');
    }
    setNewCart({ userId: '', products: [] });
    setEditingItemId(null);
  };

  const handleEditClick = (cart) => {
    setNewCart(cart);
    setEditingItemId(cart.id);
  };

  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: 'DELETE'
    });
    setCarts(carts.filter(cart => cart.id !== id));
    toast.success('Cart deleted successfully!');
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
                  <Link className="nav-link" to="/admin/users">
                    Quản lý người dùng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/admin/carts">
                    Quản lý giỏ hàng
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Quản lý giỏ hàng</h1>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User ID"
                  value={newCart.userId}
                  onChange={(e) => setNewCart({ ...newCart, userId: e.target.value })}
                />
              </div>
              <div className="col-md-12 text-center">
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleCreateOrUpdateCart}
                >
                  {editingItemId ? 'Update Cart' : 'Create Cart'}
                </button>
              </div>
            </div>

            <div className="my-5">
              <h2 className="mb-4">Danh sách giỏ hàng</h2>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Cart ID</th>
                      <th>User ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map(cart => (
                      <tr key={cart.id}>
                        <td>{cart.id}</td>
                        <td>{cart.userId}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleEditClick(cart)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(cart.id)}
                          >
                            Delete
                          </button>
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

export default CartsAdmin;