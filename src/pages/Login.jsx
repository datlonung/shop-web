import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", "admin"); // Lưu tên đăng nhập
      alert("Đăng nhập thành công! Chào mừng, admin!");
      navigate("/admin");
    } else if (username === "tan" && password === "tan123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", "tan"); // Lưu tên đăng nhập
      alert("Đăng nhập thành công! Chào mừng, tan!");
      navigate("/");
    } else {
      alert("Thông tin đăng nhập không hợp lệ.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Đăng nhập</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <div className="my-3">
                <label htmlFor="username">Tên Đăng Nhập</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="my-3">
                <label htmlFor="password">Mật Khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Đăng nhập
                </button>
                <div className="my-3">
                  <p>
                    Đã có tài khoản?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-underline text-info"
                    >
                      Đăng nhập
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
