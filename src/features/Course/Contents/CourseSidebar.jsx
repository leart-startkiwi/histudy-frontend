import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useUserProgress } from "../../../reactQuery/user-progress/useUserProgress";
import { setShowSidebar } from "../../../redux/manageCourseSlice";
import CourseSection from "./CourseSection";

function CourseSidebar({ course, sectionContents }) {
  const dispatch = useDispatch();
  const params = useParams();

  const { userProgress } = useUserProgress(params.id);

  return (
    <div className="fixed bottom-0 left-[78%] right-0 top-0 z-0 overflow-y-auto border-l-2">
      <div className="mt-14 flex items-center justify-between border-b bg-white p-3 pb-3 text-lg font-semibold">
        <p>Course Content</p>
        <FontAwesomeIcon
          icon={faXmark}
          role="button"
          title="Close panel"
          onClick={() => dispatch(setShowSidebar(false))}
        />
      </div>
      <div className="flex flex-col">
        {course?.sections?.map((section, index) => (
          <CourseSection
            key={section.id}
            section={section}
            index={index}
            contents={sectionContents.filter(
              (content) => content?.section_id === section?.id,
            )}
            userProgress={userProgress?.data}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseSidebar;
