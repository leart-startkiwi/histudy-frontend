import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseOverview from "../../ui/CourseOverview";
import GradientButton from "../../ui/GradientButton";
import HomeSectionIntro from "../../ui/HomeSectionIntro";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useCourses } from "../../reactQuery/useCourses";

function PopularCourses() {
  const { isLoading, courses: popularCourses } = useCourses({
    popular: true,
  });
  const navigate = useNavigate();

  function loadCourses() {
    navigate("/courses");
  }

  return (
    <section className="mt-36">
      <HomeSectionIntro section="Popular Courses" />
      <h2 className="mt-5 text-center text-4xl font-semibold">
        Dive into our Most Popular Picks
      </h2>

      <div className="mx-auto my-10 flex flex-col justify-center gap-y-6 px-3 pb-10 md:w-[90%] md:flex-row md:flex-wrap md:items-center md:gap-x-4">
        {isLoading ? (
          <p>LOADING...</p>
        ) : (
          popularCourses?.data?.courses?.map((course) => (
            <CourseOverview key={course.id} course={course} />
          ))
        )}
      </div>

      <GradientButton
        text="Load more courses"
        xPosition="mx-auto"
        customFn={loadCourses}
      >
        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
      </GradientButton>
    </section>
  );
}

export default PopularCourses;
