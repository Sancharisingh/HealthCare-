import React from "react";
import { useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [service, setService] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1); // Track which item is being edited

  const submitHandler = (e) => {
    e.preventDefault();
    
    // If editing an existing service, update it
    if (editingIndex !== -1) {
      let updatedService = [...service];
      updatedService[editingIndex] = { name, description, price };
      setService(updatedService);
      setEditingIndex(-1); // Reset the editing index after updating
    } else {
      // Otherwise, add a new service
      setService([...service, { name, description, price }]);
    }

    // Clear the input fields
    setDescription("");
    setName("");
    setPrice("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...service];
    copyTask.splice(i, 1);
    setService(copyTask);
  };

  const editHandler = (i) => {
    // Set the values in the input fields based on the selected service for editing
    setName(service[i].name);
    setDescription(service[i].description);
    setPrice(service[i].price);
    setEditingIndex(i); // Set the index of the item being edited
  };

  let renderTask = <h2>No service available</h2>;
  if (service.length > 0) {
    renderTask = service.map((t, i) => {
      return (
        <li key={i} className="list">
          <div className="list-box">
            <div className="inside">
              <h4>
                <h3>Name {i + 1}</h3>
                <br />
                {t.name}
              </h4>
            </div>
            <div className="inside">
              <h4>
                <h3>Description {i + 1}</h3>
                <br />
                {t.description}
              </h4>
            </div>
            <div className="inside">
              <h4>
                <h3>Price {i + 1}</h3>
                <br />
                {t.price}
              </h4>
            </div>
          </div>
          <button
            className="edit"
            onClick={() => {
              editHandler(i); // Edit button
            }}
          >
            Update
          </button>
          <button
            className="delete"
            onClick={() => {
              deleteHandler(i);
            }}
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <div className="mainBox">
        <form onSubmit={submitHandler} className="form">
          <input
            type="text"
            className="Name"
            placeholder="Enter your name."
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="Desc"
            placeholder="Enter description."
            value={description}
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            type="number"
            className="Price"
            placeholder="Enter Price."
            value={price}
            required
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <button className="Button">
            {editingIndex !== -1 ? "Update Service" : "Add New Service"}
          </button>
        </form>
      </div>
      <hr />
      <div>
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Hero;
