import Stars from "../../../ui/Stars";
import ProgressBar from "../../../ui/ProgressBar";
import { useEffect, useState } from "react";
import CourseReviews from "./CourseReviews";

function Reviews({ reviews }) {
  const [showReviews, setShowReviews] = useState([]);
  const [activeRating, setActiveRating] = useState(null);

  const courseRatings = reviews?.map((review) => review.rating);
  const avgRating =
    courseRatings?.reduce((acc, sum) => acc + sum, 0) / courseRatings?.length;

  const oneRating = courseRatings?.filter((rating) => rating === 1);
  const twoRating = courseRatings?.filter((rating) => rating === 2);
  const threeRating = courseRatings?.filter((rating) => rating === 3);
  const fourRating = courseRatings?.filter((rating) => rating === 4);
  const fiveRating = courseRatings?.filter((rating) => rating === 5);

  const oneRatingPercentage = oneRating?.length
    ? (oneRating?.length / courseRatings?.length) * 100
    : 0;
  const twoRatingPercentage = twoRating?.length
    ? (twoRating?.length / courseRatings?.length) * 100
    : 0;
  const threeRatingPercentage = threeRating?.length
    ? (threeRating?.length / courseRatings?.length) * 100
    : 0;
  const fourRatingPercentage = fourRating?.length
    ? (fourRating?.length / courseRatings?.length) * 100
    : 0;
  const fiveRatingPercentage = fiveRating?.length
    ? (fiveRating?.length / courseRatings?.length) * 100
    : 0;

  const filterReviews = (rating) => {
    if (activeRating === rating) {
      setShowReviews(reviews);
      setActiveRating(null);
      return;
    }
    setShowReviews(reviews?.filter((review) => review?.rating === rating));
    setActiveRating(rating);
  };

  useEffect(() => {
    if (reviews) setShowReviews(reviews);
  }, [reviews]);

  return (
    <div>
      <h3 className="text-2xl font-bold">Student Feedback</h3>
      <div className="mb-16 flex items-center gap-x-8">
        <div className="mt-4 flex w-fit flex-col items-center justify-start gap-y-2">
          <h1 className="text-7xl font-bold text-orange-500">
            {isNaN(avgRating) ? 0 : avgRating.toFixed(1)}
          </h1>
          <Stars ratings={avgRating} showAvg={false} showNonFilled={true} />
          <p className="font-bold text-orange-500">Course Rating</p>
        </div>

        <div className="mt-6 flex w-2/3 flex-col gap-y-4 ">
          <div
            role="button"
            onClick={() => filterReviews(5)}
            className={`${activeRating && activeRating !== 5 && "opacity-30"} relative flex items-center gap-x-3`}
          >
            <ProgressBar
              percentage={fiveRatingPercentage}
              height="h-[0.65rem]"
            />
            <div className="absolute left-[103%] flex items-center gap-x-2">
              <Stars ratings={5} showAvg={false} />
              <p className="text-blue-600 underline hover:cursor-pointer">
                {fiveRatingPercentage}%
              </p>
            </div>
          </div>
          <div
            role="button"
            onClick={() => filterReviews(4)}
            className={`${activeRating && activeRating !== 4 && "opacity-30"} relative flex items-center gap-x-3`}
          >
            <ProgressBar
              percentage={fourRatingPercentage}
              height="h-[0.65rem]"
            />
            <div className="absolute left-[103%] flex items-center gap-x-2">
              <Stars ratings={4} showAvg={false} showNonFilled={true} />
              <p className="text-blue-600 underline hover:cursor-pointer">
                {fourRatingPercentage}%
              </p>
            </div>
          </div>
          <div
            role="button"
            onClick={() => filterReviews(3)}
            className={`${activeRating && activeRating !== 3 && "opacity-30"} relative flex items-center gap-x-3`}
          >
            <ProgressBar
              percentage={threeRatingPercentage}
              height="h-[0.65rem]"
            />
            <div className="absolute left-[103%] flex items-center gap-x-2">
              <Stars ratings={3} showAvg={false} showNonFilled={true} />
              <p className="text-blue-600 underline hover:cursor-pointer">
                {threeRatingPercentage}%
              </p>
            </div>
          </div>

          <div
            role="button"
            onClick={() => filterReviews(2)}
            className={`${activeRating && activeRating !== 2 && "opacity-30"} relative flex items-center gap-x-3`}
          >
            <ProgressBar
              percentage={twoRatingPercentage}
              height="h-[0.65rem]"
            />
            <div className="absolute left-[103%] flex items-center gap-x-2">
              <Stars ratings={2} showAvg={false} showNonFilled={true} />
              <p className="text-blue-600 underline hover:cursor-pointer">
                {twoRatingPercentage}%
              </p>
            </div>
          </div>

          <div
            role="button"
            onClick={() => filterReviews(1)}
            className={`${activeRating && activeRating !== 1 && "opacity-30"} relative flex items-center gap-x-3`}
          >
            <ProgressBar
              percentage={oneRatingPercentage}
              height="h-[0.65rem]"
            />
            <div className="absolute left-[103%] flex items-center gap-x-2">
              <Stars ratings={1} showAvg={false} showNonFilled={true} />
              <p className="text-blue-600 underline hover:cursor-pointer">
                {oneRatingPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <CourseReviews reviews={showReviews} />
    </div>
  );
}

export default Reviews;
