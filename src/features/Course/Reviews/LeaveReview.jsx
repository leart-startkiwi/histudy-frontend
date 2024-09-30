import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { useCreateReview } from "../../../reactQuery/reviews/useCreateReview";
import { useDeleteReview } from "../../../reactQuery/reviews/useDeleteReview";
import { useUpdateReview } from "../../../reactQuery/reviews/useUpdateReview";

const getRatingText = (rating) => {
  switch (rating) {
    case 0:
      return "Select Rating";
    case 1:
      return "Awful, not what I expected at all";
    case 2:
      return "Poor, pretty disappointed";
    case 3:
      return "Average, could be better";
    case 4:
      return "Good, what I expected";
    case 5:
      return "Amazing, above expectactions!";
    default:
      return "Invalid rating";
  }
};

function LeaveReview({
  courseId,
  setClickedModal,
  existingRating = 0,
  existingReview = "",
  reviewId,
}) {
  const [rating, setRating] = useState(0);
  const [permRating, setPermRating] = useState(existingRating);
  const [showReviewInput, setShowReviewInput] = useState(existingRating !== 0);
  const [showDeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [reviewText, setReviewText] = useState(existingReview);
  const emptyStars = Array.from({ length: 5 }, (_, i) => i);

  const { createReview } = useCreateReview(courseId);
  const { deleteReview } = useDeleteReview(courseId);
  const { updateReview } = useUpdateReview(courseId);

  useEffect(() => {
    if (existingRating !== 0) {
      setRating(existingRating);
    }
  }, [existingRating]);

  return (
    <>
      <div className="flex flex-col gap-y-5 py-16 text-center">
        {!showDeleteConfirmation ? (
          <>
            <h3 className="text-2xl font-bold">
              {showReviewInput
                ? "Why did you leave this rating?"
                : "How would you rate this course?"}
            </h3>
            <p className="font-bold">{getRatingText(rating)}</p>
            <div
              onMouseLeave={() => {
                setRating(permRating);
              }}
              className="flex items-center justify-center gap-x-2"
            >
              {emptyStars.map((star, i) =>
                i + 1 <= rating ? (
                  <FontAwesomeIcon
                    onMouseEnter={() => setRating(i + 1)}
                    onClick={() => {
                      setPermRating(i + 1);
                      setShowReviewInput(true);
                    }}
                    key={i}
                    icon={faStar}
                    className="text-orange-500 hover:cursor-pointer"
                    size="3x"
                  />
                ) : (
                  <FontAwesomeIcon
                    onMouseEnter={() => setRating(i + 1)}
                    onClick={() => {
                      setPermRating(i + 1);
                      setShowReviewInput(true);
                    }}
                    key={i}
                    icon={emptyStar}
                    className="text-orange-500 hover:cursor-pointer"
                    size="3x"
                  />
                ),
              )}
            </div>
            {showReviewInput && (
              <>
                <textarea
                  className="mx-5 mt-5 h-36 py-5"
                  placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
                  defaultValue={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <div className="ms-auto flex items-center gap-x-3">
                  {reviewId && (
                    <button
                      onClick={() => setDeleteConfirmation(true)}
                      className="border border-black px-5 py-2 text-base font-semibold hover:bg-gray-200"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (!reviewId) {
                        createReview(
                          {
                            course_id: courseId,
                            rating: permRating,
                            review: reviewText,
                          },
                          { onSuccess: () => setClickedModal(false) },
                        );
                      } else {
                        updateReview(
                          {
                            id: reviewId,
                            updateReviewObj: {
                              review: reviewText,
                              rating: permRating,
                            },
                          },
                          { onSuccess: () => setClickedModal(false) },
                        );
                      }
                    }}
                    className="mr-5  border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700"
                  >
                    Save and Continue
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="-my-10 px-5">
            <h3 className="text-start text-2xl font-bold">
              Delete Your Review?
            </h3>
            <p className="mt-4 text-start font-bold">
              Are you sure you want to delete your review?
            </p>
            <div className="ms-auto mt-10 flex items-center justify-end gap-x-3">
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="border border-black px-5 py-2 text-base font-semibold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  deleteReview(reviewId, {
                    onSuccess: () => setClickedModal(false),
                  })
                }
                className="mr-5  border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700"
              >
                Yes, Delete My Review
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LeaveReview;
