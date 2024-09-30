import CourseModalBody from "./CourseModalBody";

import CourseContentSection from "./CourseContentSection";

function CourseContent({ sections }) {
  return (
    <CourseModalBody title="Course Content">
      <div className="flex flex-col gap-y-5">
        {sections?.map((section) => (
          <CourseContentSection key={section?.id} section={section} />
        ))}
      </div>
    </CourseModalBody>
  );
}

export default CourseContent;
