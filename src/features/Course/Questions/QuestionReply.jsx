import { useState } from "react";
import DefaultUserProfile from "../../../ui/DefaultUserProfile";
import { timeAgo } from "../../../utils/helpers";
import { useReplyUpvotes } from "../../../reactQuery/reply-upvotes/useReplyUpvotes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faCircleUp as fullCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useCreateReplyUpvote } from "../../../reactQuery/reply-upvotes/useCreateReplyUpvote";
import { useDeleteReplyUpvote } from "../../../reactQuery/reply-upvotes/useDeleteReplyUpvote";

function QuestionReply({ reply }) {
  const [upvoteCount, setUpvoteCount] = useState(reply?.upvote_count);
  const { replyUpvotes } = useReplyUpvotes(reply?.question_id);
  const { upvoteReply } = useCreateReplyUpvote(reply?.question_id);
  const { deleteReplyUpvote } = useDeleteReplyUpvote(reply?.question_id);
  const userUpvotes = replyUpvotes?.data?.map(
    (upvote) => upvote?.question_reply_id,
  );

  return (
    <div className={`flex items-start p-5`}>
      <div className="w-[8%]">
        <DefaultUserProfile
          firstName={reply?.user?.first_name}
          lastName={reply?.user?.last_name}
        />
      </div>

      <div className="flex-1 flex-col">
        <div>
          <p className="mb-1 capitalize">
            <span className="text-purple-600 underline underline-offset-2 hover:cursor-pointer">
              {reply?.user?.first_name} {reply?.user?.last_name}
            </span>{" "}
          </p>

          <p className="mb-3 text-xs">{timeAgo(reply?.created_at)}</p>
        </div>
        {reply?.reply}
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-1">
          <span className="font-semibold">{upvoteCount}</span>
          {!userUpvotes?.includes(reply.id) ? (
            <FontAwesomeIcon
              onClick={() =>
                upvoteReply(
                  { question_reply_id: reply.id },
                  {
                    onSuccess: () => {
                      setUpvoteCount(upvoteCount + 1);
                    },
                  },
                )
              }
              role="button"
              icon={faCircleUp}
              size="lg"
            />
          ) : (
            <FontAwesomeIcon
              onClick={() =>
                deleteReplyUpvote(reply?.id, {
                  onSuccess: () => {
                    setUpvoteCount(upvoteCount - 1);
                  },
                })
              }
              role="button"
              icon={fullCircleUp}
              size="lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionReply;
