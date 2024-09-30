import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { convertSecondsToMinutes } from "../../utils/helpers";
import CourseLesson from "./CourseLesson";

function CourseContentSection({ section }) {
  const [isOpen, setIsOpen] = useState(false);

  const sectionDuration = section?.contents?.reduce(
    (acc, sum) => acc + +sum?.duration,
    0,
  );

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" unselectable flex items-center justify-between border-b border-stone-200 pb-5 hover:cursor-pointer"
      >
        <p className="text-lg font-bold">
          {section?.title}
          <span className="ms-3 rounded-md bg-stone-100 p-1  text-xs font-medium text-stone-500">
            {convertSecondsToMinutes(sectionDuration)}
          </span>
        </p>
        {!isOpen ? (
          <FontAwesomeIcon icon={faPlus} />
        ) : (
          <FontAwesomeIcon icon={faMinus} />
        )}
      </div>
      {isOpen && (
        <div className=" flex flex-col gap-y-4 border-b pb-5">
          {section?.contents?.map((content) => (
            <CourseLesson key={content?.id} content={content} />
          ))}
        </div>
      )}
    </>
  );
}

export default CourseContentSection;
