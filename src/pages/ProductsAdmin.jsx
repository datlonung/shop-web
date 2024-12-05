import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsAdmin = () => {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    setData(result);
  };

  const handleCreateOrUpdateProduct = async () => {
    const url = editingItemId
      ? `https://fakestoreapi.com/products/${editingItemId}`
      : "https://fakestoreapi.com/products";
    const method = editingItemId ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const result = await response.json();
    if (editingItemId) {
      setData(data.map((item) => (item.id === editingItemId ? result : item)));
      toast.success("Product updated successfully!");
    } else {
      setData([...data, result]);
      toast.success("Product created successfully!");
    }
    setNewProduct({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
    setEditingItemId(null);
  };

  const handleEditClick = (item) => {
    setNewProduct(item);
    setEditingItemId(item.id);
  };

  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    setData(data.filter((item) => item.id !== id));
    toast.success("Product deleted successfully!");
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Quản lý sản phẩm</h1>
        <hr />
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div className="col-md-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div className="col-md-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </div>
          <div className="col-md-12 mb-3">
            <select
              className="form-control"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelery</option>
            </select>
          </div>
          <div className="col-md-12 text-center">
            <button
              className="btn btn-success btn-lg"
              onClick={handleCreateOrUpdateProduct}
            >
              {editingItemId ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>

        <div className="my-5">
          <h2 className="mb-4">Danh sách sản phẩm</h2>
          <div className="row">
            {data.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditClick(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
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

export default ProductsAdmin;
