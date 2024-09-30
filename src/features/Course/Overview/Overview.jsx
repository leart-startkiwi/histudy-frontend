import { useParams } from "react-router";
import { useCourse } from "../../../reactQuery/courses/useCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faStar } from "@fortawesome/free-solid-svg-icons";
import { convertSecondsToMinutes } from "../../../utils/helpers";

function Overview() {
  const params = useParams();
  const { course: courseData } = useCourse(params.id);
  const course = courseData?.data;

  const courseRatings = course?.reviews?.map((review) => review.rating);
  const avgRating =
    courseRatings?.reduce((acc, sum) => acc + sum, 0) / courseRatings?.length;

  const courseLength = course?.sections
    ?.map((section) => section?.contents)
    ?.flat()
    ?.reduce((acc, sum) => acc + +sum?.duration, 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold">{course?.name}</h1>
      <div className="mt-8 flex items-center gap-x-10">
        <div className="flex flex-col">
          <p className="font-bold text-orange-500">
            {isNaN(avgRating) ? 0 : avgRating}{" "}
            <FontAwesomeIcon icon={faStar} size="sm" />
          </p>
          <p className="text-sm">{courseRatings?.length} ratings</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{course?.students_count}</p>
          <p className="text-sm">Students</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{convertSecondsToMinutes(courseLength)}</p>
          <p className="text-sm">Total</p>
        </div>
      </div>
      <p className="mt-5">
        <FontAwesomeIcon icon={faGlobe} /> {course?.language}
      </p>

      <hr className="my-5"></hr>

      <div className="flex w-2/3 items-start justify-between">
        <p>By the numbers</p>
        <div className="flex flex-col">
          <p>
            Skill level:{" "}
            <span className="capitalize">{course?.skillLevel}</span>
          </p>
          <p>Students: {course?.students_count}</p>
          <p>Languages: {course?.language}</p>
        </div>
        <div className="flex flex-col">
          <p>
            Lectures:{" "}
            <span className="capitalize">{course?.content_count}</span>
          </p>
          <p>Video: {convertSecondsToMinutes(courseLength)}</p>
        </div>
      </div>

      <hr className="my-5"></hr>

      <div className="flex w-[54%] items-start justify-between">
        <p>Certificates</p>
        <div className="flex flex-col">
          <p>Get Udemy certificate by completing entire course</p>
          <button className="mt-3 border border-black px-5 py-1 text-base font-semibold hover:bg-gray-200">
            Udemy Certificate
          </button>
        </div>
      </div>

      <hr className="my-5"></hr>

      <div className="flex w-2/3 items-start gap-x-[20.2rem]">
        <p>Description</p>
        <div className="flex flex-col">
          <div
            dangerouslySetInnerHTML={{
              __html: course?.description?.description,
            }}
          ></div>
          <div>
            <p className="mt-14 text-sm font-bold">What you’ll learn</p>
            <ul className="ms-6 mt-1">
              {course?.outcomes?.map((outcome) => (
                <li key={outcome?.id} className="list-disc">
                  {outcome?.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="my-5">
            <p className="text-sm font-bold">
              Are there any course requirements or prerequisites?
            </p>
            <ul className="ms-6 mt-1">
              {course?.requirements?.map((requirement) => (
                <li key={requirement?.id} className="list-disc">
                  {requirement?.value}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold">Who this course is for:</p>
            <ul className="ms-6 mt-1">
              {course?.intented_learners?.map((learner) => (
                <li key={learner?.id} className="list-disc">
                  {learner?.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
