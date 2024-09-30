import { useEffect } from "react";
import MainBody from "../features/Instructor/MainBody";
import { useInstructorCourses } from "../reactQuery/courses/useInstructorCourses";
import { useDispatch } from "react-redux";
import { resetManageCourseData } from "../redux/manageCourseSlice";

function InstructorDashboardPage() {
  const { instructorCourses } = useInstructorCourses();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetManageCourseData());
  }, [dispatch]);

  return (
    <>
      <MainBody courses={instructorCourses?.data} />
    </>
  );
}

export default InstructorDashboardPage;
