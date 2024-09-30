import { useState } from "react";
import { Link } from "react-router-dom";

function CourseInstructorOverview({ course }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/instructor/course/${course.id}/manage`}
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex h-32 w-full border"
    >
      <img src={course.image} className="h-full w-32 object-cover" />
      <div className="my-3 ms-5 flex flex-col justify-between">
        <p className="font-semibold">{course.name}</p>
        <p>{course?.published ? "Published" : "Unpublished"}</p>
      </div>
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-50 bg-opacity-50 text-xl font-bold text-purple-600">
          <p>Edit / manage course</p>
        </div>
      )}
    </Link>
  );
}

export default CourseInstructorOverview;
