import { Link } from "react-router-dom";
import ProgressBar from "../../ui/ProgressBar";
import { useLastProgress } from "../../reactQuery/last-progress/useLastProgress";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useGetMyReviews } from "../../reactQuery/reviews/useGetMyReviews";
import Stars from "../../ui/Stars";
import Modal from "../../ui/Modal";
import LeaveReview from "../Course/Reviews/LeaveReview";

function MyLearningCourse({ course }) {
  const { lastProgress } = useLastProgress();
  const { myReviews } = useGetMyReviews();
  const [hovered, setHovered] = useState(false);
  const [clickedModal, setClickedModal] = useState(false);

  const courseLastProgress = lastProgress?.data?.find(
    (progress) => progress?.course_id === +course?.course_id,
  );

  const percentage = (course?.progress_count / course?.content_count) * 100;

  const myCourseReview = myReviews?.data?.find(
    (review) => review.course_id === course?.course_id,
  );

  return (
    <Link
      to={`/course/${course?.course_id}/lecture/${courseLastProgress?.content_id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      key={course?.id}
      className="relative flex flex-col gap-y-2"
    >
      <img
        className={`h-32 w-52 transition duration-300 ${hovered ? "blur-[1px]" : ""}`}
        src={course?.course?.image}
      />
      <p className=" text-lg font-semibold">{course?.course?.name}</p>
      <p className="-mt-2 mb-3 text-sm capitalize text-gray-600">
        {course?.user?.first_name} {course?.user?.last_name}
      </p>
      <div className="flex flex-col gap-y-1">
        <ProgressBar percentage={percentage} />
        <div className="flex items-center justify-between text-xs">
          <p>{percentage > 0 ? `${percentage}% complete` : "START COURSE"}</p>
          <div className="text-center ">
            {!myCourseReview ? (
              <>
                <Stars ratings={0.1} showNonFilled={true} showAvg={false} />
                <p className="mt-1">Leave a rating</p>
              </>
            ) : (
              <div
                role="button"
                className="z-50"
                onClick={(e) => {
                  console.log("leart59");
                  e.preventDefault();
                  setClickedModal(true);
                }}
              >
                <Stars
                  ratings={myCourseReview?.rating}
                  showNonFilled={true}
                  showAvg={false}
                />
                <p className="mt-1">Your rating</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {hovered && (
        <div className="absolute inset-0 top-9 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-white">
            <FontAwesomeIcon icon={faPlay} size="2x" className="ms-1" />
          </div>
        </div>
      )}
      {clickedModal && (
        <Modal setClickedModal={setClickedModal}>
          <LeaveReview
            courseId={course?.course_id}
            setClickedModal={setClickedModal}
            existingRating={myCourseReview?.rating}
            existingReview={myCourseReview?.review}
            reviewId={myCourseReview?.id}
          />
        </Modal>
      )}
    </Link>
  );
}

export default MyLearningCourse;
