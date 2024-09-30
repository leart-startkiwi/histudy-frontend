import { Link } from "react-router-dom";
import { useLikes } from "../../reactQuery/useLikes";
import NavbarDropdownCourse from "../../ui/NavbarDropdownCourse";

function LikedCoursesDropdown() {
  const { likedCourses } = useLikes();
  return (
    <div className="flex flex-col text-black">
      {likedCourses?.likedCourses?.length ? (
        <>
          {likedCourses.likedCourses.map((likedCourse) => (
            <NavbarDropdownCourse
              key={likedCourse.course_id}
              course={likedCourse}
              user={likedCourse.user}
            />
          ))}
          <Link
            to="/courses"
            className="mx-auto mt-3 w-3/4 rounded-md border bg-gray-800 py-3 text-center font-semibold text-white hover:bg-gray-700 "
          >
            Go to wishlist
          </Link>
        </>
      ) : (
        <>
          <p className="text-center text-base text-gray-600">
            Your wishlist is empty.
          </p>
          <Link
            to="/courses"
            className="mt-3 text-center text-base font-semibold text-violet-700 hover:text-violet-900"
          >
            Explore courses
          </Link>
        </>
      )}
    </div>
  );
}

export default LikedCoursesDropdown;
