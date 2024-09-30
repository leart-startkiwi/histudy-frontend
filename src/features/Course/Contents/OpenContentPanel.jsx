import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setShowSidebar } from "../../../redux/manageCourseSlice";

function OpenContentPanel() {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute right-0 top-12 flex items-center overflow-x-hidden text-nowrap border border-r-0 border-white px-4 py-3 text-white"
      style={{
        backgroundColor: "#2d2f31",
        transition: "width 0.4s ease-in-out",
        width: isHovered ? "200px" : "50px",
      }}
      role="button"
      onClick={() => dispatch(setShowSidebar(true))}
    >
      <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      {isHovered && (
        <p className="ml-3 text-lg font-semibold">Course Content</p>
      )}
    </div>
  );
}

export default OpenContentPanel;
