import { Outlet } from "react-router";
import NewCourseNavbar from "../../features/NewCourse/NewCourseNavbar";
import NewCourseFooter from "../../features/NewCourse/NewCourseFooter";

function NewCourseLayout() {
  return (
    <>
      <NewCourseNavbar />
      <Outlet />
      <NewCourseFooter />
    </>
  );
}

export default NewCourseLayout;
