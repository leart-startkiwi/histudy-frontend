import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faBook,
  faPencil,
  faTrash,
  faUsers,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Stars from "./Stars";
import { useModalCloser } from "../hooks/useModalCloser";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Overlay from "./Overlay";
import { useDeleteCourse } from "../reactQuery/useDeleteCourse";
import CourseModal from "../features/Courses/CourseModal";
import CourseStatusBadge from "./CourseStatusBadge";
import AddEditCourseModal from "../features/Courses/Admin/AddEditCourseModal";
import { useUpdateCourse } from "../reactQuery/useUpdateCourse";
import { useLikes } from "../reactQuery/useLikes";
import { useCreateLike } from "../reactQuery/useCreateLike";
import { useDislikeCourse } from "../reactQuery/useDislikeCourse";
import { useUser } from "../reactQuery/useUser";
import { convertSecondsToMinutes } from "../utils/helpers";
import DefaultUserProfile from "./DefaultUserProfile";
import { useAssignedCourses } from "../reactQuery/assigned-courses/useAssignedCourses";

function CourseOverview({ course, from }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdminHovered, setIsAdminHovered] = useState(false);
  const [clickedModal, setClickedModal] = useModalCloser();
  const [clickedDetailedModal, setClickedDetailedModal] = useModalCloser();
  const [clickedUpdateModal, setClickedUpdateModal] = useModalCloser();
  const { assignedCourses } = useAssignedCourses();

  const { likedCourses } = useLikes();
  const { likeCourse } = useCreateLike();
  const { dislikeCourse } = useDislikeCourse();
  const { user } = useUser();

  const isLiked = likedCourses?.courseIds?.includes(course.id);
  const isAssigned = assignedCourses?.data
    ?.map((course) => course?.course_id)
    ?.includes(course?.id);

  const { deleteCourse } = useDeleteCourse();
  const { updateCourse } = useUpdateCourse();

  const courseName =
    course?.name?.length > 60 ? course.name.slice(0, 60) + "..." : course.name;

  function removeCourse(courseId) {
    deleteCourse(courseId);
  }

  return (
    <>
      <div
        onClick={() => setClickedDetailedModal(true)}
        onMouseEnter={() => {
          if (from === "admin") {
            setIsAdminHovered(true);
          } else {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (from === "admin") {
            setIsAdminHovered(false);
          } else {
            setIsHovered(false);
          }
        }}
        className={`${from === "admin" && "relative hover:translate-y-0 hover:cursor-auto"} relative mx-auto h-[33rem]  w-full max-w-md  rounded-lg bg-white shadow-sm hover:cursor-pointer md:mx-0 md:w-[48%] lg:w-[31%]`}
      >
        <CourseStatusBadge price={course.price} />
        {user && !isAssigned && from !== "admin" && (
          <div
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isLiked) {
                likeCourse({ course_id: course.id });
              } else {
                dislikeCourse({ course_id: course.id });
              }
            }}
            className={` absolute left-6 top-6 z-10 h-11 w-11 rounded-full bg-orange-500 text-xl text-white hover:cursor-pointer hover:bg-orange-600`}
          >
            {isLiked ? (
              <FontAwesomeIcon
                icon={faHeartSolid}
                className="ms-3 mt-3 text-white"
              />
            ) : (
              <FontAwesomeIcon icon={faHeart} className="ms-3 mt-3" />
            )}
          </div>
        )}
        <div
          className={`${isHovered ? "bg-blue-600" : "bg-orange-500"} courseImage relative pb-2`}
        >
          <img
            src={course.image || `noImage.jpg`}
            className="courseImage h-[19rem] w-full "
          />
        </div>
        <div className="-mt-8 flex flex-col gap-y-4 p-5">
          <div className="flex items-center justify-between">
            <Stars
              ratings={course?.avg_rating}
              reviews={course?.reviews_count}
              showNonFilled={true}
            />
            <p className="w-fit text-nowrap rounded-lg bg-blue-900 px-4 py-1 text-sm font-semibold text-white">
              {convertSecondsToMinutes(course?.duration)}
            </p>
          </div>
          <h2
            className={`${isHovered && "underline underline-offset-8"}  text-2xl font-bold capitalize hover:cursor-pointer hover:text-blue-600`}
          >
            {courseName}
          </h2>
          <div className="flex items-center gap-x-5">
            <p className="flex items-center gap-x-2 text-nowrap text-sm text-stone-500">
              <FontAwesomeIcon icon={faBook} />
              {course?.content_count} Lessons
            </p>
            <p className="flex items-center gap-x-2 text-nowrap text-sm text-stone-500">
              <FontAwesomeIcon icon={faUsers} />
              {course?.students_count} Students
            </p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex h-14 items-center rounded-lg py-1">
            <DefaultUserProfile
              firstName={course?.user?.first_name}
              lastName={course?.user?.last_name}
            />
            <div className="ms-5 flex flex-col lg:ms-2">
              <p className="text-nowrap text-lg font-medium capitalize">
                {course?.user?.first_name} {course?.user?.last_name}
              </p>
              <p className="-mt-1 text-sm uppercase text-stone-500 ">
                Instructor
              </p>
            </div>
            <p className="ms-auto hover:text-blue-600 hover:underline hover:underline-offset-4">
              Learn More{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </p>
          </div>
        </div>
        {isAdminHovered && (
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-x-1 rounded-lg border bg-white p-1 text-3xl">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setClickedUpdateModal(true);
              }}
              className="rounded-lg px-4 py-2 text-green-700 hover:cursor-pointer hover:bg-blue-200"
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setClickedModal(true);
              }}
              className="rounded-lg px-4 py-2 text-red-700 hover:cursor-pointer hover:bg-blue-200"
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )}
      </div>
      {clickedModal && (
        <>
          <ConfirmDeleteModal
            setClickedModal={setClickedModal}
            title="Course"
            item={course}
            deleteFunction={removeCourse}
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
      {clickedUpdateModal && (
        <>
          <AddEditCourseModal
            setClickedModal={setClickedUpdateModal}
            method="Update"
            submitFunction={updateCourse}
            course={course}
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default CourseOverview;
