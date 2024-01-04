import React, { useState, useEffect ,useMemo} from "react";
import axios from "axios";
import "./displaycar.css";
import Navbar from "../Navbar/navbar";
import Modals from "../Modal/modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, deleteCar } from "../../Features/Cars/CarSlice";

const DisplayCar = () => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 3;
  const token = localStorage.getItem("token");
  
  const cars = useSelector((state) => state.cars.cars);

  console.log("cars data",cars);
  const navigate = useNavigate();
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      token: token,
    }),
    [token]
  );
const dispatch = useDispatch();
 
  const [show, setShow] = useState(false);
  const [carObject, setCarObject] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (payload) => {
    setShow(true);
    setCarObject(payload);
  };
  useEffect(() => {
    

   dispatch(fetchCars(currentPage));
   

  }, [currentPage]);
const handleDelete = (carId) => {
  dispatch(deleteCar(carId));
  
};

  return (
    <div className="carsshow">
      <Navbar />
      <h1>Display Car</h1>
      <div className="displaycar">
        {cars.map((car) => (
          <div className="card" key={car._id}>
            <div className="card-image">
              <img src={`http://localhost:3009/${car.image}`} alt="car" />
            </div>
            <div className="card-content">
              <div className="carsflex">
                <p>Name</p>
                <h3>{car.name}</h3>
              </div>
              <div className="carsflex">
                <p>Type</p>
                <h6>{car.type}</h6>
              </div>
              <div className="carsflex">
                <p>Description</p>
                <h6>{car.description}</h6>
              </div>
              <div className="carsflex">
                <p>Price</p>
                <h6>{car.price}</h6>
              </div>
              <button
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </button>
              <button onClick={() => handleShow(car)}>Update</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        
        <button
          disabled={currentPage === 0}
          onClick={()=>setCurrentPage(Math.max(currentPage - 1, 0))
           }
        >
        
          &#8249; Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)
          }
          disabled={cars.length < carsPerPage}
        >
          Next &#8250;
        </button>
      </div>
      <Modals
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        data={carObject}
        type="edit"
       
      />
    </div>
  );
};

export default DisplayCar;
