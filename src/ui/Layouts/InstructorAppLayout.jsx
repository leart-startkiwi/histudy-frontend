import { Outlet, useLocation } from "react-router";
import Navbar from "../../features/Instructor/Navbar";
import Footer from "../Footer";
import ManageCourseNavbar from "../../features/ManageCourse/ManageCourseNavbar";

function InstructorAppLayout() {
  const location = useLocation();
  const editMode = location.pathname.includes("manage");

  return (
    <div className="z-50 mt-[83px] h-full bg-stone-50 ">
      {!editMode ? <Navbar /> : <ManageCourseNavbar />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default InstructorAppLayout;
