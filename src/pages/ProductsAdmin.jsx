import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.image || !newProduct.category) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const url = editingItemId ? `https://fakestoreapi.com/products/${editingItemId}` : 'https://fakestoreapi.com/products';
    const method = editingItemId ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });
    const result = await response.json();
    if (editingItemId) {
      setData(data.map((item) => (item.id === editingItemId ? result : item)));
      toast.success('Product updated successfully!');
    } else {
      setData([...data, result]);
      toast.success('Product created successfully!');
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
                  <Link className="nav-link active" to="/admin/products">
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
              <h1 className="h2">Quản lý sản phẩm</h1>
            </div>

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
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>
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

export default ProductsAdmin;