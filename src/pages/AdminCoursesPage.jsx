import { useSearchParams } from "react-router-dom";
import { useCourses } from "../reactQuery/useCourses";
import CoursesHeader from "../features/Courses/CoursesHeader";
import CoursesList from "../features/Courses/CoursesList";
import Pagination from "../ui/Pagination";

function AdminCoursesPage() {
  const [searchParams] = useSearchParams();

  const { courses } = useCourses({
    name: searchParams?.get("name"),
    category: searchParams?.get("category"),
    status: searchParams?.getAll("status").join("&"),
    pageNumber: searchParams?.get("pageNumber") || 1,
  });

  return (
    <>
      <CoursesHeader totalCourses={courses?.totalCourses} from="admin" />
      <CoursesList courses={courses} from="admin" />
      <Pagination totalPages={courses?.totalPages} />
    </>
  );
}

export default AdminCoursesPage;
