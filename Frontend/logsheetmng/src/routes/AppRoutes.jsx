import { Routes, Route, Navigate } from "react-router-dom";

import BatchCycleList from "../pages/batchCycle/BatchCycleList";
import EditBatchCycle from "../pages/batchCycle/EditBatchCycle";
import AddBatchCycle from "../pages/batchCycle/AddBatchCycle";

import Login from "../pages/Login";
import AdminHome from "../pages/admin/AdminHome";
import Layout from "../Layout";

/* Menu Item */
import MenuItemList from "../pages/menuItem/MenuItemList";
import AddMenuItem from "../pages/menuItem/AddMenuItem";
import EditMenuItem from "../pages/menuItem/EditMenuItem";

/* Role */
import RoleList from "../pages/role/RoleList";
import AddRole from "../pages/role/AddRole";
import EditRole from "../pages/role/EditRole";
import RoleDetail from "../pages/role/RoleDetail";

/* Premises */
import PremisesList from "../pages/premises/PremisesList";
import AddPremises from "../pages/premises/AddPremises";
import EditPremises from "../pages/premises/EditPremises";

/* Course Type */
import CourseTypeList from "../pages/courseType/CourseTypeList";
import AddCourseType from "../pages/courseType/AddCourseType";
import EditCourseType from "../pages/courseType/EditCourseType";

/* Courses */
import CourseList from "../pages/course/CourseList";
import CourseDetail from "../pages/course/CourseDetail";
import AddCourse from "../pages/course/AddCourse";
import EditCourse from "../pages/course/EditCourse";

/* Staff */
import StaffList from "../pages/staff/StaffList";
import AddStaff from "../pages/staff/AddStaff";
import EditStaff from "../pages/staff/EditStaff";
import StaffDetail from "../pages/staff/StaffDetails";

/* Groups */
import GroupTableList from "../pages/grouptable/GroupTableList";
import AddGroupTable from "../pages/grouptable/AddGroupTable";
import EditGroupTable from "../pages/grouptable/EditGroupTable";

/* Modules */
import SubjectList from "../pages/admin/subject/SubjectList";
import AddSubject from "../pages/admin/subject/AddSubject";
import EditSubject from "../pages/admin/subject/EditSubject";

import SectionList from "../pages/admin/section/SectionList";
import AddSection from "../pages/admin/section/AddSection";
import EditSection from "../pages/admin/section/EditSection";

import TopicList from "../pages/admin/topic/TopicList";
import AddTopic from "../pages/admin/topic/AddTopic";

/* Role ↔ Menu Item */
import ListRoleMenuItem from "../pages/roleMenuItem/ListRoleMenuItem";
import AddRoleMenuItem from "../pages/roleMenuItem/AddRoleMenuItem";
import EditRoleMenuItem from "../pages/roleMenuItem/EditRoleMenuItem";

import AddLogsheetType from "../pages/logsheetTypes/AddLogsheetType";
import EditLogsheetType from "../pages/logsheetTypes/EditLogsheetType";
import LogsheetTypeList from "../pages/logsheetTypes/LogsheetTypeList";
/* Course Coordinator */
import CourseCoordinatorList from "../pages/courseCoordinator/CourseCoordinatorList";
import AddCourseCoordinator from "../pages/courseCoordinator/AddCourseCoordinator";
import EditCourseCoordinator from "../pages/courseCoordinator/EditCourseCoordinator";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<AdminHome />} />

        {/* Batch Cycle */}
        <Route path="/courses/batch-cycle/add" element={<AddBatchCycle />} />
        <Route
          path="/courses/batch-cycle/edit/:id"
          element={<EditBatchCycle />}
        />
        <Route path="/courses/batch-cycle" element={<BatchCycleList />} />

        {/* Premises */}
        <Route path="/courses/premises/add" element={<AddPremises />} />
        <Route path="/courses/premises/edit/:id" element={<EditPremises />} />
        <Route path="/courses/premises" element={<PremisesList />} />

        {/* Course Types */}
        <Route path="/courses/course-type/add" element={<AddCourseType />} />
        <Route
          path="/courses/course-type/edit/:id"
          element={<EditCourseType />}
        />
        <Route path="/courses/course-type" element={<CourseTypeList />} />

        {/* Courses */}
        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/courses/edit/:id" element={<EditCourse />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Role-Menu-Item (keep BEFORE any staff routes) */}
        <Route path="/staffs/role-menu-item" element={<ListRoleMenuItem />} />
        <Route
          path="/staffs/role-menu-item/add"
          element={<AddRoleMenuItem />}
        />
        <Route
          path="/staffs/role-menu-item/edit/:roleId"
          element={<EditRoleMenuItem />}
        />

        {/* Menu Item */}
        <Route path="/staffs/menu-item" element={<MenuItemList />} />
        <Route path="/staffs/menu-item/add" element={<AddMenuItem />} />
        <Route path="/staffs/menu-item/edit/:id" element={<EditMenuItem />} />

        {/* Role */}
        <Route path="/staffs/role" element={<RoleList />} />
        <Route path="/staffs/role/add" element={<AddRole />} />
        <Route path="/staffs/role/edit/:id" element={<EditRole />} />
        <Route path="/staffs/role/:id" element={<RoleDetail />} />

        {/* Course Coordinator */}
        <Route path="/staffs/course-coordinator" element={<CourseCoordinatorList />} />
        <Route path="/staffs/course-coordinator/add" element={<AddCourseCoordinator />} />
        <Route path="/staffs/course-coordinator/edit/:id" element={<EditCourseCoordinator />} />

        {/* Redirect to fix bad sidebar link /staffs/staff → /staffs */}
        <Route
          path="/staffs/staff"
          element={<Navigate to="/staffs" replace />}
        />

        {/* Staff */}
        <Route path="/staffs" element={<StaffList />} />
        <Route path="/staffs/add" element={<AddStaff />} />
        <Route path="/staffs/edit/:id" element={<EditStaff />} />
        {/* Unambiguous detail route so it never conflicts */}
        <Route path="/staffs/view/:id" element={<StaffDetail />} />

        {/* Groups */}
        <Route path="/groups/groups" element={<GroupTableList />} />
        <Route path="/groups/add" element={<AddGroupTable />} />
        <Route path="/groups/edit/:id" element={<EditGroupTable />} />

        {/* Modules */}
        <Route path="/modules/subject" element={<SubjectList />} />
        <Route path="/modules/subject/add" element={<AddSubject />} />
        <Route path="/modules/subject/edit/:id" element={<EditSubject />} />

        <Route path="/modules/section" element={<SectionList />} />
        <Route path="/modules/section/add" element={<AddSection />} />
        <Route path="/modules/section/edit/:id" element={<EditSection />} />

        <Route path="/modules/topic" element={<TopicList />} />
        <Route path="/modules/topic/add" element={<AddTopic />} />

        {/* Logsheet Type Routes */}
        <Route
          path="/logsheet/logsheet-type/add"
          element={<AddLogsheetType />}
        />
        <Route
          path="/logsheet/logsheet-type/edit/:id"
          element={<EditLogsheetType />}
        />
        <Route path="/logsheet/logsheet-type" element={<LogsheetTypeList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
