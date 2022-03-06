import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName,
      days,
    });
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id,
      newFoodName,
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>Crud App With MERN</h1>
      <label>Food Name</label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days Since You Ate It</label>
      <input
        type="number"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={addToList}>Add to List</button>

      <hr />
      {foodList.map((value, key) => {
        return (
          <div className="food" key={key}>
            <h1>{value.foodName}</h1>
            <h1>{value.daysSinceIAte}</h1>
            <input
              type="text"
              placeholder="New Food Name"
              onChange={(e) => {
                setNewFoodName(e.target.value);
              }}
            />
            <button onClick={() => updateFood(value._id)}>Update</button>
            <button onClick={() => deleteFood(value._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
