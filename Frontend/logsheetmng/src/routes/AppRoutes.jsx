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
import RoleDetail from "../pages/role/RoleDetail";
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
import StaffList from "../pages/staff/StaffList";
import AddStaff from "../pages/staff/AddStaff";
import EditStaff from "../pages/staff/EditStaff";
import StaffDetail from "../pages/staff/StaffDetails";

import GroupTableList from "../pages/grouptable/GroupTableList";
import AddGroupTable from "../pages/grouptable/AddGroupTable";
import EditGroupTable from "../pages/grouptable/EditGroupTable";

// Subject
import SubjectList from "../pages/admin/subject/SubjectList";
import AddSubject from "../pages/admin/subject/AddSubject";
import EditSubject from "../pages/admin/subject/EditSubject";

// Section
import SectionList from "../pages/admin/section/SectionList";
import AddSection from "../pages/admin/section/AddSection";
import EditSection from "../pages/admin/section/EditSection";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<AdminHome />} />

        {/* Batch Cycle Routes */}
        <Route path="/courses/batch-cycle/add" element={<AddBatchCycle />} />
        <Route
          path="/courses/batch-cycle/edit/:id"
          element={<EditBatchCycle />}
        />
        <Route path="/courses/batch-cycle" element={<BatchCycleList />} />

        {/* Premises Routes */}
        <Route path="/courses/premises/add" element={<AddPremises />} />
        <Route path="/courses/premises/edit/:id" element={<EditPremises />} />
        <Route path="/courses/premises" element={<PremisesList />} />

        {/* Course types Routes */}
        <Route path="/courses/course-type/add" element={<AddCourseType />} />
        <Route
          path="/courses/course-type/edit/:id"
          element={<EditCourseType />}
        />
        <Route path="/courses/course-type" element={<CourseTypeList />} />

        {/* Courses Routes */}
        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/courses/edit/:id" element={<EditCourse />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Menu Item Routes */}
        <Route path="/staffs/menu-item" element={<MenuItemList />} />
        <Route path="/staffs/menu-item/add" element={<AddMenuItem />} />
        <Route path="/staffs/menu-item/edit/:id" element={<EditMenuItem />} />

        {/* Role Routes */}
        <Route path="/staffs/role" element={<RoleList />} />
        <Route path="/staffs/role/add" element={<AddRole />} />
        <Route path="/staffs/role/edit/:id" element={<EditRole />} />
        <Route path="/staffs/role/:id" element={<RoleDetail />} />

        {/* Staff Routes */}
        <Route path="/staffs" element={<StaffList />} />
        <Route path="/staffs/add" element={<AddStaff />} />
        <Route path="/staffs/edit/:id" element={<EditStaff />} />
        <Route path="/staffs/:id" element={<StaffDetail />} />

        
        {/*GroupTable Routes*/}
        <Route path="/groups/groups" element={<GroupTableList />} />
        <Route path="/groups/add" element={<AddGroupTable />} />
        <Route path="/groups/edit/:id" element={<EditGroupTable />} />

         {/* Modules → Subject */}
          <Route path="/modules/subject" element={<SubjectList />} />
          <Route path="/modules/subject/add" element={<AddSubject />} />
          <Route path="/modules/subject/edit/:id" element={<EditSubject />} />

          {/* Modules → Section */}
          <Route path="/modules/section" element={<SectionList />} />
          <Route path="/modules/section/add" element={<AddSection />} />
          <Route path="/modules/section/edit/:id" element={<EditSection />} />


      </Route>
    </Routes>
  );
};

export default AppRoutes;
