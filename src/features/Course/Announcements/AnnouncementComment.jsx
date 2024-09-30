import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultUserProfile from "../../../ui/DefaultUserProfile";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { timeAgo } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useDeleteAnnouncementComment } from "../../../reactQuery/announcements/useDeleteAnnouncementComment";
import { useUpdateAnnouncementComment } from "../../../reactQuery/announcements/useUpdateAnnouncementComment";
import { useUser } from "../../../reactQuery/useUser";

function AnnouncementComment({ item }) {
  const [editMode, setEditMode] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [comment, setComment] = useState(item?.comment);
  const inputRef = useRef(null);
  const { user } = useUser();

  const { deleteAnnouncementComment } = useDeleteAnnouncementComment(
    item?.announcement_id,
  );
  const { updateAnnouncementComment } = useUpdateAnnouncementComment(
    item?.announcement_id,
  );

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <>
      <div className="flex items-center gap-x-5">
        <DefaultUserProfile
          firstName={item?.user?.first_name}
          lastName={item?.user?.last_name}
        />
        {!editMode ? (
          <div className="flex w-3/4 flex-col ">
            <div className="flex items-center gap-x-2">
              <p className="capitalize text-purple-600 underline hover:cursor-pointer">
                {item?.user?.first_name} {item?.user?.last_name}
              </p>
              <p className="text-sm">· {timeAgo(item?.createdAt)} ·</p>
              {user?.id === item?.user?.id && (
                <div className="ml-auto flex items-center gap-x-5">
                  <FontAwesomeIcon
                    role="button"
                    onClick={() => {
                      setEditMode(true);
                      setInputFocused(true);
                    }}
                    icon={faPencil}
                    size="sm"
                  />
                  <FontAwesomeIcon
                    role="button"
                    onClick={() => deleteAnnouncementComment(item._id)}
                    icon={faTrash}
                    size="sm"
                  />
                </div>
              )}
            </div>
            <p>{item.comment}</p>
          </div>
        ) : (
          <div className="flex w-3/4 flex-col gap-y-2">
            <input
              ref={inputRef}
              onFocus={() => setInputFocused(true)}
              onBlur={() => {
                setInputFocused(false);
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setInputFocused(false);
                  e.target.blur();
                }
                if (e.key === "Enter") {
                  updateAnnouncementComment(
                    {
                      id: item._id,
                      updateCommentObj: {
                        comment,
                      },
                    },
                    {
                      onSuccess: () => {
                        e.target.blur();
                      },
                    },
                  );
                }
              }}
              type="text"
              placeholder="Enter your comment"
              defaultValue={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {inputFocused && (
              <p className="text-xs">
                Press <strong>Enter</strong> to post, <strong>Esc</strong> to
                cancel
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AnnouncementComment;
