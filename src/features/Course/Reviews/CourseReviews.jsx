import DefaultUserProfile from "../../../ui/DefaultUserProfile";
import Stars from "../../../ui/Stars";
import { timeAgo } from "../../../utils/helpers";

function CourseReviews({ reviews }) {
  return (
    <div className="flex flex-col gap-y-5">
      {reviews?.map((review) => (
        <div key={review.id} className="border-b py-3 last:border-b-0 ">
          <div className="flex gap-x-5">
            {review.user.image ? (
              <img src={review.user.image} className="h-20 w-20 rounded-full" />
            ) : (
              <DefaultUserProfile
                firstName={review.user.first_name}
                lastName={review.user.last_name}
              />
            )}
            <div className="flex flex-col">
              <p className="capitalize">
                {review.user.first_name} {review.user.last_name}
              </p>
              <div className="flex items-center gap-x-3">
                <Stars
                  ratings={review.rating}
                  showAvg={false}
                  showNonFilled={true}
                />
                <p className="text-sm font-semibold text-gray-500">
                  {timeAgo(review.created_at)}
                </p>
              </div>
            </div>
          </div>
          <p className="ms-[3.75rem] mt-3">{review.review}</p>
        </div>
      ))}
    </div>
  );
}

export default CourseReviews;
