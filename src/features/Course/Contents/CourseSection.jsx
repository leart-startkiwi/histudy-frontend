import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SidebarContent from "./SidebarContent";
import { convertSecondsToMinutes } from "../../../utils/helpers";
import { useParams } from "react-router";

function CourseSection({ section, index, contents, userProgress }) {
  const params = useParams();
  const [openContents, setOpenContents] = useState(false);

  const progressIds = userProgress?.map((progress) => progress?.content_id);

  const sectionProgress = contents?.filter((content) =>
    progressIds?.includes(content?.id),
  );

  const sectionDuration = convertSecondsToMinutes(
    contents?.reduce((acc, sum) => acc + +sum.duration, 0),
  );

  useEffect(() => {
    if (
      section?.contents
        ?.map((content) => content.id)
        ?.includes(+params?.lectureId)
    ) {
      setOpenContents(true);
    }
  }, [params?.lectureId, section?.contents]);

  return (
    <div
      role="button"
      onClick={() => setOpenContents(!openContents)}
      className="border-b"
    >
      <div className="unselectable flex items-center justify-between p-5">
        <div className="flex flex-col">
          <p className="font-semibold">
            Section {index + 1}: {section?.title}
          </p>
          <p className="text-xs">
            {sectionProgress?.length} / {section?.contents?.length} |{" "}
            {sectionDuration}
          </p>
        </div>
        {!openContents ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} />
        )}
      </div>
      {openContents && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col bg-white"
        >
          {contents?.map((content) => (
            <SidebarContent
              key={content?.id}
              content={content}
              userProgress={userProgress}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseSection;
