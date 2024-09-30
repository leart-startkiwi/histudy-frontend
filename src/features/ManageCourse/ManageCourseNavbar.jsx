import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { useCourse } from "../../reactQuery/courses/useCourse";
import { useUpdateCourse } from "../../reactQuery/useUpdateCourse";
import { useSelector } from "react-redux";
import { useUpdateCourseSection } from "../../reactQuery/course-sections/useUpdateCourseSection";
import { useUpdateCourseContent } from "../../reactQuery/course-contents/useUpdateCourseContent";
import toast from "react-hot-toast";
import { useLastProgress } from "../../reactQuery/last-progress/useLastProgress";

function ManageCourseNavbar() {
  const params = useParams();
  const { course } = useCourse(params.id);
  const { updateCourse } = useUpdateCourse();
  const { updateCourseSection } = useUpdateCourseSection();
  const { updateCourseContent } = useUpdateCourseContent();
  const { lastProgress } = useLastProgress();

  const courseLastProgress = lastProgress?.data?.find(
    (progress) => progress?.course_id === +params.id,
  );

  const manageCourseStore = useSelector((store) => store.manageCourse);
  const saveButtonDisabled =
    !manageCourseStore.changedContents.changed &&
    !manageCourseStore?.changedSections &&
    !manageCourseStore?.changes &&
    manageCourseStore?.changedFields?.length === 0;

  const handleCourseUpdate = () => {
    const changedFields = manageCourseStore?.changedFields;
    const updateObjData = {};

    for (const field of changedFields) {
      if (field === "category") {
        updateObjData.categoryId = manageCourseStore.category.id;
      } else if (
        field === "requirements" ||
        field === "outcomes" ||
        field === "intented_learners" ||
        field === "description"
      ) {
        updateObjData[field] = JSON.stringify(manageCourseStore[field]);
      } else {
        updateObjData[field] = manageCourseStore[field];
      }
    }

    const changedLectureSections = [
      ...new Set(manageCourseStore.changedContents.sections),
    ];

    const filteredContents = manageCourseStore.contents
      .filter((content) => changedLectureSections.includes(content.section_id))
      .map((content) => content.contents)
      .flat();

    if (
      manageCourseStore.changedContents.changed &&
      manageCourseStore.contents?.length
    ) {
      for (const content of filteredContents) {
        updateCourseContent(
          {
            id: content.id,
            updateCourseContentObj: {
              position: content.position,
              section_id: content.section_id,
            },
          },
          {
            onSuccess: () => {
              toast.success("Course updated successfully.");
            },
          },
        );
      }
    }

    if (manageCourseStore.changedSections) {
      for (const section of manageCourseStore.sections) {
        updateCourseSection(
          {
            id: section.id,
            updateCourseSectionObj: { position: section.position },
          },
          {
            onSuccess: () => {
              toast.success("Course updated successfully.");
            },
          },
        );
      }
    }

    if (!changedFields.length) return;

    updateCourse({
      id: params.id,
      updateCourseObj: updateObjData,
    });
  };

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between px-7 font-semibold text-white"
      style={{ backgroundColor: "#2d2f31" }}
    >
      <div className="flex items-center">
        <Link
          to="/instructor/courses"
          role="button"
          className="flex items-center gap-x-3"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mt-[0.15rem]" />{" "}
          <p>Back to courses</p>
        </Link>
        <p className="ms-10 text-lg font-extrabold">{course?.data?.name}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <Link
          to={`/course/${params.id}/lecture/${courseLastProgress?.content_id}`}
          className="border border-white px-5 py-[0.35rem] hover:bg-gray-700"
        >
          Preview
        </Link>
        <button
          disabled={saveButtonDisabled}
          onClick={handleCourseUpdate}
          className="border border-white bg-white px-5 py-[0.35rem] text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ManageCourseNavbar;
