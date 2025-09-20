import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuItemForm from "../../components/MenuItemForm";

const AddMenuItem = () => {
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState({
    title: "",
    description: "",
    path: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/menu-items", menuItem);
      alert("Menu item created successfully!");
      navigate("/users/menu-item");
    } catch (error) {
      console.error("Error creating menu item:", error);
      alert("Failed to create menu item.");
    }
  };

  return (
    <MenuItemForm
      menuItem={menuItem}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Menu Item"
      buttonLabel="Create"
    />
  );
};

export default AddMenuItem;
