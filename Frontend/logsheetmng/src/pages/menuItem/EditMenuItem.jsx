import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import MenuItemForm from "../../components/MenuItemForm";

const EditMenuItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState({
    title: "",
    description: "",
    backendApiUrlPath: "",
    frontendPageUrl: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`http://localhost:8080/api/menu-items/${id}`)
      .then((res) => {
        setMenuItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu item:", err);
        alert("Failed to load menu item data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`http://localhost:8080/api/menu-items/${id}`, menuItem)
      .then(() => {
        alert("Menu item updated successfully!");
        navigate("/staffs/menu-item");
      })
      .catch((err) => {
        console.error("Error updating menu item:", err);
        alert("Failed to update menu item.");
      });
  };

  if (loading) {
    return <p>Loading menu item...</p>;
  }

  return (
    <MenuItemForm
      menuItem={menuItem}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Menu Item"
      buttonLabel="Save"
    />
  );
};

export default EditMenuItem;
