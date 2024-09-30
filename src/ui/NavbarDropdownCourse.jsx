import CourseModal from "../features/Courses/CourseModal";
import { useModalCloser } from "../hooks/useModalCloser";
import { useCreateCart } from "../reactQuery/cart/useCreateCart";
import Overlay from "./Overlay";

function NavbarDropdownCourse({ course, user, cart = false }) {
  const { addToCart } = useCreateCart();
  const [clickedModal, setClickedModal] = useModalCloser();

  return (
    <div className="border-b px-3 py-5 last:border-b-0">
      <div
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          setClickedModal(true);
        }}
        className="flex gap-x-3 align-baseline"
      >
        <img src={course.image} className="h-16 w-16" />
        <div className="d-flex flex-col">
          <p className="text-sm font-semibold">{course.name}</p>
          <p className="text-sm text-gray-600">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-600">${course.price}</p>
        </div>
      </div>
      {!cart && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ course_id: course?.course_id });
          }}
          className="mt-3 w-full rounded-md border bg-stone-50 py-[0.35rem] hover:bg-gray-200"
        >
          Add to cart
        </button>
      )}
      {clickedModal && (
        <>
          <CourseModal course={course} setClickedModal={setClickedModal} />
          <Overlay />
        </>
      )}
    </div>
  );
}

export default NavbarDropdownCourse;
