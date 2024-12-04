import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
      <div className="container my-3 py-3">
        <h1 className="text-center">Manage Carts</h1>
        <hr />
        <div className="row">
          <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="User ID" value={newCart.userId} onChange={(e) => setNewCart({ ...newCart, userId: e.target.value })} />
          </div>
          <div className="col-md-12 text-center">
            <button className="btn btn-success btn-lg" onClick={handleCreateOrUpdateCart}>
              {editingItemId ? 'Update Cart' : 'Create Cart'}
            </button>
          </div>
        </div>

        <div className="my-5">
          <h2 className="mb-4">Carts List</h2>
          <div className="row">
            {carts.map(cart => (
              <div key={cart.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Cart ID: {cart.id}</h5>
                    <p className="card-text">User ID: {cart.userId}</p>
                    <button className="btn btn-primary me-2" onClick={() => handleEditClick(cart)}>Update</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(cart.id)}>Delete</button>
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

export default CartsAdmin;