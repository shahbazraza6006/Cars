import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUsers } from "../../Features/Users/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setdata] = useState({ email, password });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      token: token,
    }),
    [token]
  );
  useEffect(() => {
    if (headers.token) {
      navigate('/');
    }
  }, [headers.token, navigate]);

  const loginUser = async () => {
    try {
    //   console.log('Received data:', email, password);
      await dispatch(loginUsers({ email, password }));
     
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };;

  return (
    <div className="mainlogin">
      <div className="minicontainer">
        <div className="left-login">
          {/* <img src={pic1} alt="profile" /> */}
          <h2>CarWorld</h2>
          <p>An amazing place to view latest cars</p>
        </div>
        <div className="right-div">
          <h1>Welcome to World Of Cars</h1>
          <div className="login">
            <h3>Login</h3>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                loginUser();
              }}
            >
              Login
            </button>
            <div className="noaccount">
              <p>
                Don't Have an Account? <a href="/signup">SignUp</a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
