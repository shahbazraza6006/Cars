import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard/dashboard";
import AddCar from "./Components/AddCar/addcar";
import DisplayCar from "./Components/Display Cars/displaycar";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Modal from "./Components/Modal/modal";


function App() {
  const token = localStorage.getItem("token");

  const useAuth = () => {
    return token ? true : false;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    if (isAuth === true && window.location.pathname === "/login") {
      return <Navigate to="/" />;
    } else if (isAuth === false) {
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoutes />}>
            <Route  exact path="/" element={<Dashboard />} />
            <Route exact path="/modal" element={<Modal />} />
            <Route exact path="/addcar" element={<AddCar />} />
            <Route exact path="/displaycar" element={<DisplayCar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
