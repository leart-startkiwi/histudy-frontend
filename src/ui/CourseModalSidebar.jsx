import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseSidebarProperty from "./CourseSidebarProperty";
import GradientButton from "./GradientButton";
import { useCreateCart } from "../reactQuery/cart/useCreateCart";
import { useCart } from "../reactQuery/cart/useCart";
import { useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentSession } from "../services/apiPayment";
import { useAssignedCourses } from "../reactQuery/assigned-courses/useAssignedCourses";
import { Link } from "react-router-dom";
import { useLastProgress } from "../reactQuery/last-progress/useLastProgress";
import { convertSecondsToMinutes } from "../utils/helpers";
import { useUser } from "../reactQuery/useUser";

function CourseModalSidebar({ course }) {
  const { addToCart } = useCreateCart();
  const { user } = useUser();
  const { cart } = useCart();
  const isAddedToCart = cart?.data?.find(
    (cart) => cart?.course_id === course?.id,
  );

  const { assignedCourses } = useAssignedCourses();
  const isAssigned = assignedCourses?.data
    ?.map((course) => course?.course_id)
    ?.includes(course?.id);

  const { lastProgress } = useLastProgress();

  const courseLastProgress = lastProgress?.data?.find(
    (progress) => progress?.course_id === +course?.id,
  );

  const navigate = useNavigate();

  const certificate = course?.certificate ? "Yes" : "No";

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PzQHZDpaV13eo6WbFbwKMr1GMDjtF132kfv4YTVRzgfwu5jtORUcgQS4k3ZPMg2qWRSyE26XOj69OTzFPquNobU00TNMAD8jI",
    );

    const session = await createPaymentSession({
      products: [
        {
          course: {
            name: course?.name,
            image: course?.image,
            price: course?.price,
          },
          course_id: course?.id,
        },
      ],
    });

    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="sticky bottom-44 ms-auto w-1/4 rounded-lg border-4 border-indigo-500 bg-white p-5 ">
      <div>
        {isAssigned && user && (
          <Link
            to={`/course/${course?.id}/lecture/${courseLastProgress?.content_id}`}
            className="mx-auto block w-full border border-black bg-gray-800 px-5 py-3 text-center text-base font-semibold text-white hover:bg-gray-700"
          >
            Go to Course
          </Link>
        )}
        {!isAssigned && course?.price && user && (
          <>
            <GradientButton
              text={isAddedToCart ? "Go to cart" : "Add to Cart"}
              yPosition="mt-5"
              xPosition="mx-auto"
              width="w-full"
              customFn={() => {
                if (!isAddedToCart) {
                  addToCart({ course_id: course?.id });
                } else {
                  navigate("/cart");
                }
              }}
            />
            <button
              onClick={() => makePayment()}
              className="mx-auto mt-5 w-full rounded-md border-2 border-gray-200 bg-white py-3 text-xl font-bold  hover:bg-blue-600 hover:text-white"
            >
              Buy Now
            </button>
          </>
        )}
      </div>

      {!isAssigned && user && (!course?.price || +course?.price === 0) && (
        <GradientButton
          text="Enroll Now"
          yPosition="mt-5"
          xPosition="mx-auto"
          width="w-full"
        />
      )}

      <div className="mt-10 flex flex-col gap-y-3">
        <CourseSidebarProperty
          property="Category"
          value={course?.category.name}
        />

        <CourseSidebarProperty
          property="Enrolled"
          value={course?.students_count}
        />
        <CourseSidebarProperty
          property="Length"
          value={convertSecondsToMinutes(course?.duration)}
        />

        <CourseSidebarProperty
          property="Lectures"
          value={course?.content_count}
        />
        <CourseSidebarProperty
          property="Skill Level"
          value={course?.skillLevel}
        />
        <CourseSidebarProperty property="Language" value={course?.language} />
        <CourseSidebarProperty property="Certificate" value={certificate} />
        <button className="w-full rounded-full border bg-blue-200 py-3">
          <FontAwesomeIcon icon={faPhone} className="me-2" />
          Call Us:{" "}
          <span className="font-semibold text-blue-600">+383 (45) 359 900</span>
        </button>
      </div>
    </div>
  );
}

export default CourseModalSidebar;
