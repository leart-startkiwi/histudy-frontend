import CourseBulletPoints from "./CourseBulletPoints";
import CourseModalBody from "./CourseModalBody";

function CourseOverview({ course }) {
  return (
    <>
      <CourseModalBody title="Overview">
        <div className="my-5 flex flex-col gap-y-8">
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
      </CourseModalBody>
    </>
  );
}

export default CourseOverview;
