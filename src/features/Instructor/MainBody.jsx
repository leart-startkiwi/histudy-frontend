import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradientButton from "../../ui/GradientButton";
import CourseInstructorOverview from "./CourseInstructorOverview";
import { Link } from "react-router-dom";
import { useState } from "react";

function MainBody({ courses }) {
  const [search, setSearch] = useState("");
  const filteredCourses =
    courses &&
    courses?.filter((course) =>
      course.name.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <main className="mx-auto w-5/6">
      <h1 className="text-3xl font-bold ">Courses</h1>
      <div className="mt-10 flex items-center justify-between">
        <div className="relative w-fit rounded-full border-2 px-5 py-3 text-black">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Your Courses..."
            className="me-12 bg-transparent outline-none placeholder:font-medium"
          />

          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <Link to="/instructor/courses/new">
          <GradientButton text="New Course" yPosition="mt-0" />
        </Link>
      </div>
      <div className="mt-14 flex flex-col gap-y-3">
        {filteredCourses?.map((course) => (
          <CourseInstructorOverview key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}

export default MainBody;
