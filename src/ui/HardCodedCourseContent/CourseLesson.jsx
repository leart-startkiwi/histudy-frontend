import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertSecondsToMinutes } from "../../utils/helpers";
import { faFile, faVideo } from "@fortawesome/free-solid-svg-icons";

function CourseLesson({ content }) {
  return (
    <div className="flex items-center justify-between duration-0 hover:cursor-pointer hover:text-blue-600">
      <p>
        <span className="me-3">
          {content?.content_type === "video" ? (
            <FontAwesomeIcon icon={faVideo} />
          ) : (
            <FontAwesomeIcon icon={faFile} />
          )}
        </span>
        {content?.title}
      </p>
      <p className="rounded-md bg-stone-100 p-1 text-xs  font-medium text-stone-500">
        {convertSecondsToMinutes(content?.duration)}
      </p>
    </div>
  );
}

export default CourseLesson;
