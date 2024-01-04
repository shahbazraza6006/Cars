import React from "react";
import "./updatecar.css";

import { useState } from "react";
import axios from "axios";

const UpdateCar = (props) => {
  const [id] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const headers = {
    'Content-Type': 'multipart/form-data',
    token: token,
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
    
      <div>
        <form>
          <div className="addformss">
            <div>
              <h2>Upload a Car In Inventory</h2>
              {/* <p>Search Car by Name</p>
              <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
              <button onClick={(e) => {
                e.preventDefault();
                axios
                  .get(`http://localhost:3009/car/findcar/${name}`, { headers })
                  .then((response) => {
                    console.log(response.data.Car);
                    setId(response.data.Car._id);
                    setType(response.data.Car.type);
                    setDescription(response.data.Car.description);
                    setPrice(response.data.Car.price);
                    setImage(response.data.Car.files[0]);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}>Search</button> */}
              <label>Name:</label>
              <input type="text" value={name} onChange={handleNameChange} />
            </div>
            <div>
              <label>Type:</label>
              <input type="text" value={type} onChange={handleTypeChange} />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input type="number" value={price} onChange={handlePriceChange} />
            </div>
            <div>
              <label>Image:</label>
              <input type="file"  onChange={handleImageChange} />
            </div>
            <button type="submit" onClick={() => {
              const data = { name, type, description, price, image };
              axios.put(`http://localhost:3009/car/updatecar/${id}`, data, { headers }).then((response) => {
                alert("Car Inventory Updated");
                console.log(response.data.message);
                //  window.location.reload(false);
              }).catch((err) => {
                console.error(err);
              });
            }}>Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
