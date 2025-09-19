import { Routes, Route } from "react-router-dom";
import BatchCycleList from "../pages/batchCycle/BatchCycleList";
import EditBatchCycle from "../pages/batchCycle/EditBatchCycle";
import AddBatchCycle from "../pages/batchCycle/AddBatchCycle";
import Login from "../pages/Login";
import AdminHome from "../pages/admin/AdminHome";
import Layout from "../Layout";

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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
