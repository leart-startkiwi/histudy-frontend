import CourseBulletPoints from "./CourseBulletPoints";
import CourseModalBody from "./CourseModalBody";

function CourseDetails({ requirements, outcomes }) {
  return (
    <CourseModalBody title="Requirements" secondTitle="Outcomes">
      <CourseBulletPoints requirements={requirements} outcomes={outcomes} />
    </CourseModalBody>
  );
}

export default CourseDetails;
