import { Link } from "react-router-dom";
import { useAssignedCourses } from "../../reactQuery/assigned-courses/useAssignedCourses";
import MyLearningDropDownCourse from "./MyLearningDropDownCourse";

function MyLearningDropdown() {
  const { assignedCourses } = useAssignedCourses();
  return (
    <div className="flex flex-col text-black">
      {assignedCourses?.results ? (
        <>
          {assignedCourses.data.map((assignedCourse) => (
            <MyLearningDropDownCourse
              key={assignedCourse?.id}
              assignedCourse={assignedCourse}
            />
          ))}
          <Link
            to="/my-courses/learning"
            className="mx-auto mt-3 w-3/4 rounded-md border bg-gray-800 py-3 text-center font-semibold text-white hover:bg-gray-700 "
          >
            Go to My learning
          </Link>
        </>
      ) : (
        <>
          <p className="text-center text-base text-gray-600">
            You are not assigned to any course.
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

export default MyLearningDropdown;
