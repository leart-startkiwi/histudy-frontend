import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../reactQuery/useUser";
import DefaultUserProfile from "../../../ui/DefaultUserProfile";
import { timeAgo } from "../../../utils/helpers";
import { useCreateAnnouncementComment } from "../../../reactQuery/announcements/useCreateAnnouncementComment";
import AnnouncementComments from "./AnnouncementComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUpdateAnnouncementComment } from "../../../reactQuery/announcements/useUpdateAnnouncementComment";
import { useDeleteAnnouncementComment } from "../../../reactQuery/announcements/useDeleteAnnouncementComment";

function Announcement({ item }) {
  const { user } = useUser();
  const [inputFocused, setInputFocused] = useState(false);
  const { createAnnouncementComment } = useCreateAnnouncementComment();

  const [comment, setComment] = useState("");
  const [justAdded, setJustAdded] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const itemsCount = justAdded
    ? item?.comments_count - 1
    : item?.comments_count;

  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);
  const { updateAnnouncementComment } = useUpdateAnnouncementComment(
    justAdded?.announcement_id,
  );
  const { deleteAnnouncementComment } = useDeleteAnnouncementComment(
    justAdded?.announcement_id,
  );

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    if (justAdded) {
      setEditComment(justAdded?.comment);
    }
  }, [justAdded]);

  useEffect(() => {
    if (!itemsCount) {
      setShowComments(false);
    }
  }, [itemsCount]);

  return (
    <div className="flex flex-col border-b-2 py-5 last:border-b-0">
      <div className="flex items-center gap-x-2">
        <DefaultUserProfile
          firstName={item?.user?.first_name}
          lastName={item?.user?.last_name}
          widthHeight={"h-12 w-12"}
        />
        <div className="flex w-3/4 flex-col ">
          <p className="capitalize text-purple-600 underline hover:cursor-pointer">
            {item?.user?.first_name} {item?.user?.last_name}
          </p>
          <p className="text-sm">
            posted an announcement · {timeAgo(item?.createdAt)} ·
          </p>
        </div>
      </div>
      <div
        className=" py-5"
        dangerouslySetInnerHTML={{ __html: item?.content }}
      ></div>
      <div className="flex items-start gap-x-5">
        <DefaultUserProfile
          firstName={user?.first_name}
          lastName={user?.last_name}
        />
        <div className="flex w-3/4 flex-col gap-y-2">
          <input
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setInputFocused(false);
                e.target.blur();
              }
              if (e.key === "Enter") {
                createAnnouncementComment(
                  {
                    comment,
                    announcement_id: item?._id,
                  },
                  {
                    onSuccess: (data) => {
                      e.target.blur();
                      setComment("");
                      setJustAdded(data?.data);
                    },
                  },
                );
              }
            }}
            type="text"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {inputFocused && (
            <p className="text-xs">
              Press <strong>Enter</strong> to post, <strong>Esc</strong> to
              cancel
            </p>
          )}
        </div>
      </div>
      {justAdded && (
        <div className="mt-5 flex items-center gap-x-5">
          <DefaultUserProfile
            firstName={justAdded?.user?.first_name}
            lastName={justAdded?.user?.last_name}
          />
          {!editMode ? (
            <div className="flex w-3/4 flex-col">
              <div className="justAddeds-center flex gap-x-2">
                <p className="capitalize text-purple-600 underline hover:cursor-pointer">
                  {justAdded?.user?.first_name} {justAdded?.user?.last_name}
                </p>
                <p className="text-sm">· {timeAgo(justAdded?.createdAt)} ·</p>
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
                    onClick={() => {
                      deleteAnnouncementComment(justAdded?._id);
                      setJustAdded(null);
                    }}
                    icon={faTrash}
                    size="sm"
                  />
                </div>
              </div>
              <p>{justAdded?.comment}</p>
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
                        id: justAdded._id,
                        updateCommentObj: {
                          comment: editComment,
                        },
                      },
                      {
                        onSuccess: (data) => {
                          e.target.blur();
                          setJustAdded(data?.data);
                        },
                      },
                    );
                  }
                }}
                type="text"
                placeholder="Enter your comment"
                defaultValue={editComment}
                onChange={(e) => setEditComment(e.target.value)}
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
      )}
      {!showComments && itemsCount > 0 && (
        <p
          role="button"
          onClick={() => {
            setShowComments(true);
            setJustAdded(null);
          }}
          className="mt-5 font-bold underline underline-offset-[6px] hover:text-gray-700"
        >
          Show comments ({itemsCount})
        </p>
      )}
      {showComments && (
        <AnnouncementComments
          announcementId={item._id}
          setShowComments={setShowComments}
          setJustAdded={setJustAdded}
          itemsCount={itemsCount}
        />
      )}
    </div>
  );
}

export default Announcement;
