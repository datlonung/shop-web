import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', image: '', category: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json();
    setData(result);
  };

  const handleCreate = async () => {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });
    const result = await response.json();
    setData([...data, result]);
  };

  const handleUpdate = async (id) => {
    const updatedProduct = { ...newProduct, id };
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    });
    const result = await response.json();
    setData(data.map(item => (item.id === id ? result : item)));
  };

  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE'
    });
    setData(data.filter(item => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Trang Admin</h1>
        <hr />
        <div className="row">
          {data.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <button className="btn btn-primary me-2" onClick={() => handleUpdate(item.id)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-5">
          <h2 className="mb-4">Tạo sản phẩm mới</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control" placeholder="Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            </div>
            <div className="col-md-12 mb-3">
              <input type="text" className="form-control" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            </div>
            <div className="col-md-12 mb-3">
              <input type="text" className="form-control" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
            </div>
            <div className="col-md-12 mb-3">
              <input type="text" className="form-control" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            </div>
            <div className="col-md-12 text-center">
              <button className="btn btn-success btn-lg" onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;