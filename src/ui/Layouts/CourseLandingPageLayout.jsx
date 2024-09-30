import { Outlet } from "react-router";
import Footer from "../Footer";
import CourseNavbar from "../../features/Course/CourseNavbar";

function CourseLandingPageLayout() {
  return (
    <div className="z-50 mt-[83px] h-full bg-stone-50 ">
      <CourseNavbar />
      <Outlet />
      <Footer courseLanding={true} />
    </div>
  );
}

export default CourseLandingPageLayout;
