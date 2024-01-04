import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../Features/Users/UserSlice";
const Signup = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    gender: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseStatus = useSelector((state) => state.users.responseStatus);
  const createUsers = () => {
    dispatch(createUser(data));
    alert("User Created Successfully");
  };

  return (
    <div>
      <div className="signup ">
        <h1>Signup</h1>
        <div className="big">
          <div className="small">
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={(e) => setdata({ ...data, name: e.target.value })}
            />
          </div>

          <div className="small">
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
          </div>
        </div>

        <div className="big">
          <div className="small">
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phonenumber"
              onChange={(e) =>
                setdata({ ...data, phonenumber: e.target.value })
              }
            />
          </div>

          <div className="small">
            <input
              type="text"
              placeholder="Enter Address"
              name="address"
              onChange={(e) => setdata({ ...data, address: e.target.value })}
            />
          </div>
        </div>

        <div className="big">
          <div className="small">
            <input
              type="text"
              name="gender"
              placeholder="Enter Gender"
              onChange={(e) => setdata({ ...data, gender: e.target.value })}
            />
          </div>
        </div>
        <div className="big">
          <div className="small">
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setdata({ ...data, password: e.target.value }) }
            />
          </div>
          <div className="small">
            <input
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <br></br>
        <button onClick={createUsers}>Signup</button>
        <p>
          Already Have an Account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};
export default Signup;
