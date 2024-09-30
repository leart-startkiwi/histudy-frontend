import {
  faChevronDown,
  faChevronUp,
  faPencil,
  faPlayCircle,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDeleteCourseContent } from "../../../reactQuery/course-contents/useDeleteCourseContent";
import { useUpdateCourseContent } from "../../../reactQuery/course-contents/useUpdateCourseContent";
import { useSelector } from "react-redux";
import GeneralDropdown from "../GeneralDropdown";
import { inputStyle, labelStyle } from "../../../utils/helpers";
import NewContent, { Article } from "./NewContent";
import useVideoData from "../../../hooks/useVideoData";

const ItemType = {
  LECTURE: "lecture",
};

function Lecture({ lecture, index, moveLecture, sectionId }) {
  const { deleteCourseContent } = useDeleteCourseContent();
  const { updateCourseContent } = useUpdateCourseContent();
  const { thumbnail, duration } = useVideoData({
    url: lecture?.path,
    type: lecture?.content_type,
  });
  const [showSectionsDropdown, setShowSectionsDropdown] = useState(false);
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [lectureTitle, setLectureTitle] = useState(lecture.title);
  const [currentActionText, setCurrentActionText] = useState(
    "Select content type",
  );
  const [showContentDetails, setShowContentDetails] = useState(false);

  const [showNewContentForm, setShowNewContentForm] = useState(false);
  const [showArticle, setShowArticle] = useState(false);

  const { sections, contents } = useSelector((store) => store.manageCourse);
  const sectionDropdownOptions = sections?.map((section) => ({
    id: section.id,
    name: section.title,
  }));

  const [hovered, setHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.LECTURE,
    item: { id: lecture.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType.LECTURE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveLecture(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div className="relative border border-black">
      <div
        ref={(node) => drag(drop(node))}
        className={`flex min-h-16 items-center gap-x-5  bg-white p-3 hover:cursor-move ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (showSectionsDropdown) return;
          setHovered(false);
        }}
      >
        <div className={`${showEditTitle && "flex w-full flex-col"} `}>
          <h3
            className={`${showEditTitle && "flex items-center gap-x-3"}  text-nowrap text-lg font-bold`}
          >
            Lecture {index + 1}:{" "}
            {!showEditTitle ? (
              <span className="text-base font-semibold">
                {lecture?.content_type === "video" && (
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="mr-1"
                    size="sm"
                  />
                )}
                {lecture.title}
              </span>
            ) : (
              <div className="relative flex-1">
                <input
                  id="title"
                  type="text"
                  className={inputStyle}
                  placeholder=" "
                  defaultValue={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
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
                  updateCourseContent({
                    id: lecture.id,
                    updateCourseContentObj: {
                      title: lectureTitle,
                    },
                  });
                  setShowEditTitle(false);
                }}
                className="border border-black bg-gray-800 px-5 py-1 text-lg font-semibold text-white hover:bg-gray-700"
              >
                Save Lecture
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
              onClick={() => deleteCourseContent(lecture.id)}
              icon={faTrash}
              className="mt-1 text-sm hover:cursor-pointer"
            />
            <div className="relative ms-auto">
              {!showNewContentForm && (
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => {
                      setShowSectionsDropdown(!showSectionsDropdown);
                    }}
                    className="w-fit border border-black px-5 py-1 font-semibold hover:bg-gray-200"
                  >
                    Change section
                  </button>
                  {!lecture.path && !lecture.text ? (
                    <button
                      onClick={() => setShowNewContentForm(true)}
                      className="w-fit border border-black px-5 py-1 font-semibold hover:bg-gray-200"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Content
                    </button>
                  ) : !showContentDetails ? (
                    <FontAwesomeIcon
                      onClick={() => setShowContentDetails(true)}
                      icon={faChevronDown}
                      className="mx-3 p-3 hover:cursor-pointer"
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={() => setShowContentDetails(false)}
                      icon={faChevronUp}
                      className="mx-3  p-3 hover:cursor-pointer"
                    />
                  )}
                </div>
              )}

              {showSectionsDropdown && (
                <GeneralDropdown
                  chosen={
                    sectionDropdownOptions?.find(
                      (section) => section.id === sectionId,
                    )?.name
                  }
                  data={sectionDropdownOptions}
                  width="w-52"
                  top="top-10"
                  customFn={(item) => {
                    const foundContents = contents.find(
                      (content) => content.section_id === item.id,
                    ).contents;

                    updateCourseContent({
                      id: lecture.id,
                      updateCourseContentObj: {
                        position: foundContents.length
                          ? foundContents[foundContents.length - 1].position + 1
                          : 0,
                        section_id: item.id,
                      },
                    });
                  }}
                />
              )}
            </div>
          </>
        )}
        {showNewContentForm && (
          <button
            onClick={() => setShowNewContentForm(false)}
            className="absolute right-10 top-8 z-10 ms-auto w-fit border border-b-0 border-black bg-white px-5 py-1 font-semibold"
          >
            {currentActionText} <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>
      {showContentDetails && (
        <div className="flex items-center gap-x-3 border-t border-black bg-white p-2">
          <img
            src={thumbnail ? thumbnail : "/public/file-icon.png"}
            className={`${thumbnail ? "h-14 w-24" : "h-14 w-14"}`}
          />
          <div className="flex flex-col">
            <p className="font-bold">{lecture.file_name}</p>
            <p>{duration}</p>
            <p
              onClick={() => {
                setShowContentDetails(false);
                setShowNewContentForm(true);
                if (lecture?.content_type === "article") {
                  setShowArticle(true);
                }
              }}
              className="font-semibold text-purple-600 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faPencil} /> Edit Content
            </p>
          </div>
        </div>
      )}
      {showNewContentForm && (
        <NewContent
          contentId={lecture.id}
          setCurrentActionText={setCurrentActionText}
          setShowContentDetails={setShowContentDetails}
          setShowNewContentForm={setShowNewContentForm}
          showArticle={showArticle}
          existingText={lecture?.text}
          existingArticleDuration={lecture?.duration}
        />
      )}
    </div>
  );
}

export default Lecture;
