import { Routes, Route } from "react-router-dom";
import BatchCycleList from "../pages/batchCycle/BatchCycleList";
import EditBatchCycle from "../pages/batchCycle/EditBatchCycle";
import AddBatchCycle from "../pages/batchCycle/AddBatchCycle";
import Login from "../pages/Login";
import AdminHome from "../pages/admin/AdminHome";
import Layout from "../Layout";
import MenuItemList from "../pages/menuItem/MenuItemList";
import AddMenuItem from "../pages/menuItem/AddMenuItem";
import EditMenuItem from "../pages/menuItem/EditMenuItem";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* This is the nested route with the common layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<AdminHome />} />
        <Route path="/courses/batch-cycle" element={<BatchCycleList />} />
        <Route
          path="/courses/batch-cycle/edit/:id"
          element={<EditBatchCycle />}
        />
        <Route path="/courses/batch-cycle/add" element={<AddBatchCycle />} />

        <Route path="/users/menu-item" element={<MenuItemList />} />
        <Route path="/users/menu-item/add" element={<AddMenuItem />} />
        <Route path="/users/menu-item/edit/:id" element={<EditMenuItem />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
