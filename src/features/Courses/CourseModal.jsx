import CourseModalSidebar from "../../ui/CourseModalSidebar";
import CourseModalPill from "../../ui/CourseModalPill";
import { useState } from "react";
import CourseListView from "../../ui/CourseListView";
import CourseOverview from "../../ui/HardCodedCourseContent/CourseOverview";
import CourseDetails from "../../ui/HardCodedCourseContent/CourseDetails";
import Instructor from "../../ui/HardCodedCourseContent/Instructor";
import Reviews from "../../ui/HardCodedCourseContent/Reviews";
import CourseContent from "../../ui/HardCodedCourseContent/CourseContent";
import { useCourse } from "../../reactQuery/courses/useCourse";

function CourseModal({ course }) {
  const [activePill, setActivePill] = useState("Overview");

  const { course: detailedCourse } = useCourse(course.id || course.course_id);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[500000] h-full w-full bg-stone-50 p-10 shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-[85%] lg:w-3/4 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg"
    >
      <CourseListView course={detailedCourse?.data} />
      <div className="mt-6 flex w-[70%] items-center gap-x-1 rounded-full bg-white p-[0.35rem] shadow-md">
        <CourseModalPill
          text="Overview"
          activePill={activePill}
          setActivePill={setActivePill}
        />
        <CourseModalPill
          text="Course Content"
          activePill={activePill}
          setActivePill={setActivePill}
        />
        <CourseModalPill
          text="Details"
          activePill={activePill}
          setActivePill={setActivePill}
        />
        <CourseModalPill
          text="Instructor"
          activePill={activePill}
          setActivePill={setActivePill}
        />
        <CourseModalPill
          text="Reviews"
          activePill={activePill}
          setActivePill={setActivePill}
        />
      </div>
      {activePill === "Overview" && (
        <CourseOverview course={detailedCourse?.data} />
      )}
      {activePill === "Course Content" && (
        <CourseContent sections={detailedCourse?.data?.sections} />
      )}
      {activePill === "Details" && (
        <CourseDetails
          requirements={detailedCourse?.data?.requirements}
          outcomes={detailedCourse?.data?.outcomes}
        />
      )}
      {activePill === "Instructor" && <Instructor />}
      {activePill === "Reviews" && (
        <Reviews reviews={detailedCourse?.data?.reviews} />
      )}

      <CourseModalSidebar course={detailedCourse?.data} />
    </div>
  );
}

export default CourseModal;
