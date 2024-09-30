import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCreateUserProgress } from "../../../reactQuery/user-progress/useCreateUserProgress";
import { useDeleteProgress } from "../../../reactQuery/user-progress/useDeleteProgress";
import { convertSecondsToMinutes } from "../../../utils/helpers";

function SidebarContent({ content, userProgress }) {
  const params = useParams();
  const { createUserProgress } = useCreateUserProgress();
  const { deleteUserProgress } = useDeleteProgress();
  const location = useLocation();

  const isChecked = userProgress?.find(
    (userProgress) => userProgress?.content_id === content?.id,
  );

  return (
    <Link
      to={`/course/${content.course_id}/lecture/${content.id}${location.hash}`}
      className={`${+params.lectureId === content?.id && "bg-gray-200"} px-5 py-4 hover:bg-gray-200`}
    >
      <div className="flex gap-x-3">
        <input
          type="checkbox"
          className="border-black text-black outline-none"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onChange={() => {
            if (isChecked) {
              deleteUserProgress(isChecked.id);
            } else {
              createUserProgress({
                course_id: content.course_id,
                content_id: content.id,
              });
            }
          }}
          checked={!!isChecked}
        />
        <div className="-mt-1 flex flex-col">
          <p className="text-sm">
            {content.index}. {content?.title}
          </p>
          <div className="flex items-center gap-x-1">
            {content?.content_type === "video" && (
              <FontAwesomeIcon
                icon={faVideo}
                size="xs"
                className="mt-[0.065rem]"
              />
            )}
            <p className="text-xs text-gray-600">
              {convertSecondsToMinutes(content?.duration)}
            </p>
          </div>
          {/* <p className="text-xs">{section?.contents?.length} / 3 | 31 min</p> */}
        </div>
      </div>
    </Link>
  );
}

export default SidebarContent;
