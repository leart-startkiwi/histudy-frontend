import { useParams } from "react-router";
import { useCourse } from "../../reactQuery/courses/useCourse";
import Logo from "../../ui/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPencil,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import "./CourseNavbar.css";
import { useUserProgress } from "../../reactQuery/user-progress/useUserProgress";
import { useEffect, useRef, useState } from "react";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useModalCloser } from "../../hooks/useModalCloser";
import Modal from "../../ui/Modal";
import { useGetOwnReview } from "../../reactQuery/reviews/useGetOwnReview";
import LeaveReview from "./Reviews/LeaveReview";

function CourseNavbar() {
  const params = useParams();
  const { course: courseData } = useCourse(params.id);
  const course = courseData?.data;
  const { userProgress } = useUserProgress(params.id);
  const { ownReview } = useGetOwnReview(params.id);

  const [showProgress, setShowProgress] = useState(false);
  const [clickedModal, setClickedModal] = useModalCloser();

  const progressPercentage =
    (userProgress?.results / course?.content_count) * 100;

  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setShowProgress(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b px-7 font-semibold text-white"
        style={{ backgroundColor: "#2d2f31" }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <p className="ms-10 text-lg font-extrabold">{course?.name}</p>
          </div>
          <div className="flex items-center gap-x-8">
            <div
              onClick={() => setClickedModal(!clickedModal)}
              className="hover:cursor-pointer"
            >
              {!ownReview ? (
                <p className="text-base font-normal">
                  <FontAwesomeIcon icon={faStar} className="mr-1" />
                  Leave a rating
                </p>
              ) : (
                <p className="text-base font-normal">
                  <FontAwesomeIcon icon={faPencil} className="mr-2" />
                  Edit your rating
                </p>
              )}
            </div>
            {course?.content_count ? (
              <div
                ref={toggleRef}
                onClick={() => setShowProgress(!showProgress)}
                className="relative flex items-center gap-x-3 hover:cursor-pointer"
              >
                <div
                  className="progress-circle"
                  style={{ "--progress": `${progressPercentage}%` }}
                >
                  <FontAwesomeIcon
                    icon={faTrophy}
                    size="sm"
                    className={`${progressPercentage < 90 ? "text-white" : "text-purple-600"}`}
                  />
                </div>
                <p className="text-base font-normal">
                  {progressPercentage < 90
                    ? "Your progress"
                    : "Get certificate"}
                </p>{" "}
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
                {showProgress && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    ref={dropdownRef}
                    className="unselectable absolute right-0 top-14 z-50 inline-block w-fit transform whitespace-nowrap border border-gray-300 bg-white p-5 text-black shadow-md hover:cursor-default"
                  >
                    <p className="font-semibold">
                      {userProgress?.results} of {course?.content_count}{" "}
                      complete.
                    </p>
                    {progressPercentage < 90 ? (
                      <p className="mt-4 text-sm font-normal">
                        Finish course to get your certificate.
                      </p>
                    ) : (
                      <button className="mt-4 border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700">
                        Get certificate
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {clickedModal && (
        <Modal setClickedModal={setClickedModal}>
          <LeaveReview
            courseId={course?.id}
            setClickedModal={setClickedModal}
            existingRating={ownReview?.data?.rating}
            existingReview={ownReview?.data?.review}
            reviewId={ownReview?.data?.id}
          />
        </Modal>
      )}
    </>
  );
}

export default CourseNavbar;
