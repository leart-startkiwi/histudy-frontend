import { useEffect } from "react";
import NewCourseContent from "../features/NewCourse/NewCourseContent";

function NewCoursePage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <d>
      <NewCourseContent />
    </d>
  );
}

export default NewCoursePage;
