import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addcar.css";
import { createCars, updateCar } from "../../Features/Cars/CarSlice";

const AddCar = ({ data, type }) => {
  const cars = useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();
  const [name, setName] = useState(""); 
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");
 
  const [error, setError] = useState({});
  const [car, setCar] = useState({
    
    name: "",
    type: "",
    description: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "multipart/form-data",
    token: token,
  };
  useEffect(() => {
    type === "edit"
      ? setCar({
          name: data.name,
          type: data.type,
          description: data.description,
          price: data.price,
          image: data.image,
        })
      : setCar({
          name: "",
          type: "",
          description: "",
          price: "",
          image: "",
        });
  }, [data]);

 
  const handleChange = (event) => {
    event.preventDefault();
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const carData = {
      name: car.name,
      type: car.type,
      description: car.description,
      price: car.price,
      image: image
    };

    const headers = {
      "Content-Type": "multipart/form-data",
      token: token,
    };

    const errors = {};
    let hasError = false;

    if (!car.name) {
      errors.name = "Fill the field";
      hasError = true;
    }
    if (!car.type) {
      errors.type = "Fill the field";
      hasError = true;
    }
    if (!car.description) {
      errors.description = "Fill the field";
      hasError = true;
    }
    if (!car.price ) {
      errors.price = "Fill the field";
      hasError = true;
    }
    if(car.price <0){
      errors.price = "Price cannot be negative";
      hasError = true;
    }
    if (!image && type !== "edit") {
      errors.image = "uplaod the image";
      hasError = true;
    }

    if (hasError) {
      setError(errors);
      return;
    }

    if (type === "edit") {
      console.log("Updating car data:", carData);
    console.log("Headers:", headers);
      dispatch(
        updateCar({ 
          carId: data._id,
          data: carData,
        })
      )
    } else {
      console.log(carData);
      console.log(headers);
      
      dispatch(createCars(carData));
    }
  };

  return (
    <div>
      <div>
        
        <form onSubmit={handleSubmit}>
       
          <div className="addformss">
            <div>
              {type === "edit" ? (
                <h2>Edit Car In Inventory</h2>
              ) : (
                <h2>Upload A Car in Inventory</h2>
              )}
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={car.name}
                onChange={handleChange}
              />
              {error.name && <span className="error">{error.name}</span>}
            </div>
            <div>
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={car.type}
                onChange={handleChange}
              />
              {error.type && <span className="error">{error.type}</span>}
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={car.description}
                onChange={handleChange}
              />
              {error.description && (
                <span className="error">{error.description}</span>
              )}
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={car.price}
                onChange={handleChange}
              />
              {error.price && <span className="error">{error.price}</span>}
            </div>
            <div>
              <label>Image:</label>
              {type === "edit" ? (
                <>
                  {car.image ? (
                    <img
                      src={`http://localhost:3009/${car.image}`}
                      alt="car"
                    />
                  ) : null}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  {error.image && (
                    <span className="error">{error.image}</span>
                  )}
                </>
              )}
            </div>
            {type === "edit" ? (
              <button type="submit" hidden={false}>
                Update
              </button>
            ) : (
              <button type="submit">Upload</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
