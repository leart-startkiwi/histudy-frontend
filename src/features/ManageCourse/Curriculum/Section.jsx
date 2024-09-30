import { useState } from "react";
import Lecture from "./Lecture";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDeleteCourseSection } from "../../../reactQuery/course-sections/useDeleteCourseSection";
import { useDispatch, useSelector } from "react-redux";
import { setContents } from "../../../redux/manageCourseSlice";
import NewCurriculumItem from "./NewCurriculumItem";
import { inputStyle, labelStyle } from "../../../utils/helpers";
import { useUpdateCourseSection } from "../../../reactQuery/course-sections/useUpdateCourseSection";

const ItemType = {
  SECTION: "section",
};

function Section({ id, title, index, moveSection }) {
  const dispatch = useDispatch();

  const [showEditTitle, setShowEditTitle] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(title);

  const [hovered, setHovered] = useState(false);
  const [showNewItem, setShowNewItemForm] = useState(false);

  const { deleteCourseSection } = useDeleteCourseSection();
  const { updateCourseSection } = useUpdateCourseSection();

  const { contents, changedContents } = useSelector(
    (store) => store.manageCourse,
  );
  const sectionContents = contents?.filter(
    (content) => content?.section_id === id,
  )[0]?.contents;

  const moveLecture = (fromIndex, toIndex) => {
    const updatedLectures = [...sectionContents];
    const [movedLecture] = updatedLectures.splice(fromIndex, 1);

    const newLecture = { ...movedLecture, position: toIndex };
    updatedLectures.splice(toIndex, 0, newLecture);

    const adjustedLectures = updatedLectures.map((lecture, index) => ({
      ...lecture,
      position: index,
    }));

    dispatch(
      setContents({
        section_id: id,
        contents: [
          ...contents.filter((content) => content.section_id !== id),
          {
            section_id: id,
            contents: adjustedLectures.filter((lecture) => lecture.id),
          },
        ],
      }),
    );
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.SECTION,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType.SECTION,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`${isDragging ? "opacity-50" : "opacity-100"} flex w-full flex-col border border-black bg-gray-50 pb-10`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center  gap-x-5 p-3 pb-8 hover:cursor-move"
      >
        <div
          className={`${showEditTitle && "flex w-full flex-col border border-black bg-white p-2"} `}
        >
          <h3
            className={`${showEditTitle && "flex items-center gap-x-3"}  text-nowrap text-lg font-bold`}
          >
            Section {index + 1}:{" "}
            {!showEditTitle ? (
              <span className="text-base font-semibold">{title}</span>
            ) : (
              <div className="relative flex-1">
                <input
                  id="title"
                  type="text"
                  className={inputStyle}
                  placeholder=" "
                  defaultValue={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
                <label htmlFor="title" className={labelStyle}>
                  Enter Title
                </label>
              </div>
            )}
          </h3>
          {showEditTitle && (
            <div className="ms-auto flex items-center gap-x-3 py-5 pr-5">
              <button
                onClick={() => setShowEditTitle(false)}
                className="border border-black px-5 py-1 text-lg font-semibold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateCourseSection({
                    id,
                    updateCourseSectionObj: {
                      title: sectionTitle,
                    },
                  });
                  setShowEditTitle(false);
                }}
                className="border border-black bg-gray-800 px-5 py-1 text-lg font-semibold text-white hover:bg-gray-700"
              >
                Save Section
              </button>
            </div>
          )}
        </div>
        {hovered && !showEditTitle && (
          <>
            <FontAwesomeIcon
              onClick={() => setShowEditTitle(true)}
              icon={faPencil}
              className="mt-1 text-sm hover:cursor-pointer"
            />
            <FontAwesomeIcon
              onClick={() => deleteCourseSection(id)}
              icon={faTrash}
              className="mt-1 text-sm hover:cursor-pointer"
            />
          </>
        )}
      </div>
      <div className="flex flex-col gap-y-3 pr-5 ps-20 pt-5">
        {sectionContents?.map((lecture, index) => (
          <Lecture
            key={lecture.id}
            lecture={lecture}
            index={index}
            moveLecture={moveLecture}
            sectionId={id}
          />
        ))}
        {!showNewItem ? (
          <button
            onClick={() => setShowNewItemForm(true)}
            className="mt-3 w-fit border border-black px-5 py-1 font-semibold hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faPlus} /> Curriculum Item
          </button>
        ) : (
          <FontAwesomeIcon
            role="button"
            className="mr-auto"
            size="lg"
            icon={faXmark}
            onClick={() => setShowNewItemForm(false)}
          />
        )}
        {showNewItem && (
          <NewCurriculumItem
            setShowNewItemForm={setShowNewItemForm}
            contents={sectionContents}
            sectionId={id}
          />
        )}
      </div>
    </div>
  );
}

export default Section;
