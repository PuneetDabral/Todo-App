"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

import { userAuthUrl } from "../../api";
import { setUserSessionStore } from "../../store/slices/authSlice";

const LoginPage=()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const dispatch = useDispatch();
  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.post(userAuthUrl, {
        username:email,
        password,
      });
      if(response?.data){
      const { token,email } = response.data;
      dispatch(setUserSessionStore({ user: email, token }));
      localStorage.setItem("token", token);
      router.push("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials or server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary bg-gradient">
      <div className="card shadow-lg p-4" style={{ width: "22rem" }}>
        <h2 className="mb-4 text-center text-dark">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Show error if login fails */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;