import { useSelector } from "react-redux";
import CourseOverview from "../../ui/CourseOverview";
import NoResultsFound from "../../ui/NoResultsFound";
import GradientButton from "../../ui/GradientButton";
import { useModalCloser } from "../../hooks/useModalCloser";
import AddEditCourseModal from "./Admin/AddEditCourseModal";
import { useCreateCourse } from "../../reactQuery/useCreateCourse";
import Overlay from "../../ui/Overlay";
import CourseListView from "../../ui/CourseListView";
import { useState } from "react";
import CourseModal from "./CourseModal";
import CourseStatusBadge from "../../ui/CourseStatusBadge";

function CoursesList({ courses, from }) {
  const { filterOpen } = useSelector((store) => store.filterOpen);
  const { createCourse } = useCreateCourse();
  const [clickedModal, setClickedModal] = useModalCloser();
  const { courseView } = useSelector((store) => store.courseView);
  const [clickedDetailedModal, setClickedDetailedModal] = useModalCloser();
  const [course, setCourse] = useState({});

  function openModal() {
    setClickedModal(true);
  }

  if (courses?.results === 0) return <NoResultsFound />;

  return (
    <>
      <div
        className={`${filterOpen ? "my-10" : "-mt-32"} mx-auto  flex flex-col justify-center gap-y-6 px-3 pb-10 md:w-[90%] md:flex-row md:flex-wrap md:items-center md:gap-x-4`}
      >
        {courseView === "grid" &&
          courses?.map((course) => (
            <CourseOverview key={course.id} course={course} from={from} />
          ))}

        {courseView === "list" &&
          courses?.map((course) => (
            <div
              onClick={() => {
                setCourse(course);
                setClickedDetailedModal(true);
              }}
              key={course.id}
              className="w-3/4 transform rounded-lg bg-white p-5 hover:scale-105 hover:cursor-pointer"
            >
              <CourseStatusBadge status={course.price} />

              <CourseListView
                course={course}
                from="list"
                setCourse={setCourse}
              />
            </div>
          ))}
      </div>

      {from === "admin" && (
        <div className="sticky bottom-5">
          <GradientButton
            text="Add new Course"
            xPosition="mx-auto"
            yPosition="-mt-5 mb-10"
            customFn={openModal}
          />
        </div>
      )}
      {clickedModal && (
        <>
          <AddEditCourseModal
            setClickedModal={setClickedModal}
            method="Create"
            submitFunction={createCourse}
          />
          <Overlay />
        </>
      )}
      {clickedDetailedModal && (
        <>
          <CourseModal
            course={course}
            setClickedModal={setClickedDetailedModal}
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default CoursesList;
