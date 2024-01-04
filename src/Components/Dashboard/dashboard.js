import React, { useState } from "react";

import './dashboard.css'
import Navbar from "../Navbar/navbar";
import PriceRangeChart from "../Chart/chart";
import Modals from '../Modal/modal.js';const Dashboard = () => {
   
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        
        <div className="dashboard">
        <Navbar />
        <div className="minidash">
        <h1>Dashboard</h1>
       
          {/* <a href="/addcar">Add Car</a> */}
          <button onClick={handleShow} >
          Add
          </button>
          <a href="/displaycar"><button>Display Car</button></a>
          
          <Modals  />
          
        
          <PriceRangeChart />

        </div>
        <Modals  handleClose={handleClose} handleShow={handleShow} show={show} type="add"/>
        </div>
    );
    }
export default Dashboard;