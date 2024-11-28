import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", price: "", description: "", image: "", category: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `https://fakestoreapi.com/products/${editId}` : "https://fakestoreapi.com/products/";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (editId) {
      setProducts(products.map((product) => (product.id === editId ? data : product)));
    } else {
      setProducts([...products, data]);
    }

    setForm({ title: "", price: "", description: "", image: "", category: "" });
    setEditId(null);
    setLoading(false);
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((product) => product.id !== id));
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
          <button type="submit" disabled={loading}>
            {editId ? "Update" : "Add"} Product
          </button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.title} - ${product.price}
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;