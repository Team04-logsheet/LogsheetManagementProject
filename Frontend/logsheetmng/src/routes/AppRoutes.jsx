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
import CourseList from "../pages/course/CourseList";
import CourseDetail from "../pages/course/CourseDetail";
import AddCourse from "../pages/course/AddCourse";
import EditCourse from "../pages/course/EditCourse";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<AdminHome />} />

        {/* ✅ Start of the fix: Group all specific 'courses' routes first */}
        <Route path="/courses/batch-cycle/add" element={<AddBatchCycle />} />
        <Route
          path="/courses/batch-cycle/edit/:id"
          element={<EditBatchCycle />}
        />
        <Route path="/courses/batch-cycle" element={<BatchCycleList />} />

        <Route path="/courses/premises/add" element={<AddPremises />} />
        <Route path="/courses/premises/edit/:id" element={<EditPremises />} />
        <Route path="/courses/premises" element={<PremisesList />} />

        <Route path="/courses/course-type/add" element={<AddCourseType />} />
        <Route
          path="/courses/course-type/edit/:id"
          element={<EditCourseType />}
        />
        <Route path="/courses/course-type" element={<CourseTypeList />} />

        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/courses/edit/:id" element={<EditCourse />} />

        {/* ✅ The general course list route should come after more specific paths */}
        <Route path="/courses" element={<CourseList />} />
        {/* ✅ The wildcard route must be last in the /courses group */}
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Menu Item Routes */}
        <Route path="/users/menu-item" element={<MenuItemList />} />
        <Route path="/users/menu-item/add" element={<AddMenuItem />} />
        <Route path="/users/menu-item/edit/:id" element={<EditMenuItem />} />

        {/* Role Routes */}
        <Route path="/users/role" element={<RoleList />} />
        <Route path="/users/role/add" element={<AddRole />} />
        <Route path="/users/role/edit/:id" element={<EditRole />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
