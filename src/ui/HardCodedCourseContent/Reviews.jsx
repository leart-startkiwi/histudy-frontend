import CourseReviews from "../../features/Course/Reviews/CourseReviews";
import CourseModalBody from "./CourseModalBody";

function Reviews({ reviews }) {
  return (
    <CourseModalBody title="Reviews">
      <CourseReviews reviews={reviews} />
    </CourseModalBody>
  );
}

export default Reviews;
