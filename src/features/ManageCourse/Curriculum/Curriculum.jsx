import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Section from "./Section";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialCurriculumData,
  setSections,
} from "../../../redux/manageCourseSlice";
import { useParams } from "react-router";
import { useCourse } from "../../../reactQuery/courses/useCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import NewSection from "./NewSection";

function Curriculum() {
  const dispatch = useDispatch();
  const params = useParams();
  const { course } = useCourse(params.id);
  const { sections, contents } = useSelector((store) => store.manageCourse);

  const [showNewSectionForm, setShowNewSectionForm] = useState(false);

  const moveSection = (fromIndex, toIndex) => {
    const updatedSections = [...sections];
    const [movedSection] = updatedSections.splice(fromIndex, 1);

    const newSection = { ...movedSection, position: toIndex };
    updatedSections.splice(toIndex, 0, newSection);

    const adjustedSections = updatedSections.map((section, index) => ({
      ...section,
      position: index,
    }));

    dispatch(setSections(adjustedSections));
  };

  useEffect(() => {
    dispatch(setInitialCurriculumData({ sections: course?.data?.sections }));
  }, [course?.data?.sections, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <p>
        Start putting together your course by creating sections, lectures, and
        practice activities (quizzes, coding exercises, and assignments). Use
        your course outline to structure your content and label your sections
        and lectures clearly. If you’re intending to offer your course for free,
        the total length of video content must be less than 2 hours.
      </p>
      {sections.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          text={"testing"}
          index={index}
          title={section.title}
          moveSection={moveSection}
        />
      ))}
      {!showNewSectionForm ? (
        <button
          onClick={() => setShowNewSectionForm(true)}
          className="-mt-5 w-fit border border-black px-5 py-2 text-lg font-semibold hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faPlus} /> Section
        </button>
      ) : (
        <FontAwesomeIcon
          role="button"
          className="mr-auto"
          size="lg"
          icon={faXmark}
          onClick={() => setShowNewSectionForm(false)}
        />
      )}
      {showNewSectionForm && (
        <NewSection setShowNewSectionForm={setShowNewSectionForm} />
      )}
    </DndProvider>
  );
}

export default Curriculum;
