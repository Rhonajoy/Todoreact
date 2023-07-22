import React, { useState, useEffect } from "react";
import "./todo.css";

import axios from "axios";

const Todo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post form data to the endpoint
      await axios.post("http://localhost:3001/posts", formData);

      //   // Fetch the data from the endpoint using GET request
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");

      //   // Update the state with the fetched data
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`); // Change the URL to match your server address
      getTodos(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const editPost = async (id) => {
    console.log(id);
    try {
      await axios.put(`http://localhost:3001/posts/${id}`,{formData});
      console.log(formData)
       // Change the URL to match your server address
      // getTodos(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            id="description"
            value={formData.title}
            onChange={handleChange}
          />
          <br />
          <br />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            cols="20"
            rows="5"
          ></textarea>
          <br />
          <button type="submit">SAVE</button>
        </form>
        {/* Display the fetched data */}


        {responseData.map(function (res) {
          return (
            <div key={res.id}>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                onClick={() => handleDelete(res.id)}
                onChange={handleChange}
              />
              <label for="vehicle1">{res.title}</label>
              <button onClick={() => editPost(res.id)}> EDIT</button>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Todo;
