import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function ChangeContentIndicators({ previousContent, nextContent }) {
  const params = useParams();
  const { showSidebar } = useSelector((store) => store.manageCourse);

  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  return (
    <>
      {previousContent && (
        <>
          <Link
            onClick={() => setIsRightHovered(false)}
            to={`/course/${params.id}/lecture/${previousContent?.id}`}
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
            className="absolute left-0 top-72 border border-l-0 border-white px-2 py-3 font-semibold text-white"
            style={{ backgroundColor: "#2d2f31" }}
            role="button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
          {isLeftHovered && (
            <div
              className="absolute left-8 top-72 border border-white px-2 py-3 font-semibold text-white"
              style={{ backgroundColor: "#2d2f31" }}
            >
              {previousContent?.title}
            </div>
          )}
        </>
      )}

      {nextContent && (
        <>
          <Link
            onClick={() => setIsLeftHovered(false)}
            to={`/course/${params.id}/lecture/${nextContent?.id}`}
            onMouseEnter={() => setIsRightHovered(true)}
            onMouseLeave={() => setIsRightHovered(false)}
            className={`${showSidebar ? "right-[22%]" : "right-0"} absolute  top-72 border border-r-0 border-white px-2 py-3 font-semibold text-white`}
            style={{ backgroundColor: "#2d2f31" }}
            role="button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>

          {isRightHovered && (
            <div
              className={`${showSidebar ? "right-[23.7%]" : " right-8"} absolute top-72 border border-white px-2 py-3 font-semibold text-white`}
              style={{ backgroundColor: "#2d2f31" }}
            >
              {nextContent?.title}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ChangeContentIndicators;
