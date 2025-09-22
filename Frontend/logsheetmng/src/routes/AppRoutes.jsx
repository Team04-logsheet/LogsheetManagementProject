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
import RoleList from "../pages/role/RoleList";
import AddRole from "../pages/role/AddRole";
import EditRole from "../pages/role/EditRole";
import PremisesList from "../pages/premises/PremisesList";
import AddPremises from "../pages/premises/AddPremises";
import EditPremises from "../pages/premises/EditPremises";
import CourseTypeList from "../pages/courseType/CourseTypeList";
import AddCourseType from "../pages/courseType/AddCourseType";
import EditCourseType from "../pages/courseType/EditCourseType";

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

        <Route path="/courses/premises" element={<PremisesList />} />
        <Route path="/courses/premises/add" element={<AddPremises />} />
        <Route path="/courses/premises/edit/:id" element={<EditPremises />} />

        <Route path="/courses/course-type" element={<CourseTypeList />} />
        <Route path="/courses/course-type/add" element={<AddCourseType />} />
        <Route
          path="/courses/course-type/edit/:id"
          element={<EditCourseType />}
        />

        <Route path="/users/menu-item" element={<MenuItemList />} />
        <Route path="/users/menu-item/add" element={<AddMenuItem />} />
        <Route path="/users/menu-item/edit/:id" element={<EditMenuItem />} />

        <Route path="/users/role" element={<RoleList />} />
        <Route path="/users/role/add" element={<AddRole />} />
        <Route path="/users/role/edit/:id" element={<EditRole />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
