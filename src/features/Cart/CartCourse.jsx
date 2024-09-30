import Stars from "../../ui/Stars";
import { convertSecondsToMinutes } from "../../utils/helpers";
import CourseModal from "../Courses/CourseModal";
import Overlay from "../../ui/Overlay";
import { useModalCloser } from "../../hooks/useModalCloser";
import { useDeleteCart } from "../../reactQuery/cart/useDeleteCart";
import { useCreateLike } from "../../reactQuery/useCreateLike";

function CartCourse({ course, cartItem }) {
  const [clickedModal, setClickedModal] = useModalCloser();

  const { removeFromCart } = useDeleteCart();
  const { likeCourse } = useCreateLike();

  return (
    <>
      <div
        role="button"
        onClick={() => setClickedModal(true)}
        className="flex justify-between border-t py-5"
      >
        <div className="flex items-center">
          <img
            src={course?.image}
            className="h-20 w-32 border-2 object-cover"
          />
          <div className="ms-4 flex flex-col gap-y-4">
            <div>
              <p className="text-lg font-semibold">{course?.name}</p>
              <p className="text-sm capitalize">
                By {course?.user?.first_name} {course?.user?.last_name}
              </p>
            </div>
            <div className="text-xs">
              <Stars
                ratings={course?.avg_rating}
                reviews={course?.reviews_count}
                showNonFilled={true}
              />
              <p className="mt-2 flex items-center gap-x-3">
                {convertSecondsToMinutes(course?.duration)} <span> · </span>
                <span>{course?.content_count} lectures</span>
                <span> · </span>
                <span className="capitalize">{course?.skillLevel}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-x-14">
          <div className="flex flex-col gap-y-2">
            <p
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(cartItem?.id);
              }}
              className="font-semibold text-purple-600 hover:text-purple-800"
            >
              Remove
            </p>
            <p
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(cartItem?.id);
                likeCourse({ course_id: course?.id });
              }}
              className="font-semibold text-purple-600 hover:text-purple-800"
            >
              Move to wishlist
            </p>
          </div>
          <p className="font-bold">${course?.price}</p>
        </div>
      </div>
      {clickedModal && (
        <>
          <CourseModal course={course} setClickedModal={setClickedModal} />
          <Overlay />
        </>
      )}
    </>
  );
}

export default CartCourse;
