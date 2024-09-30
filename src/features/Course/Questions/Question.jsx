import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultUserProfile from "../../../ui/DefaultUserProfile";
import { faCircleUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { buildQuestionsQueryObj, timeAgo } from "../../../utils/helpers";
import { useSelector } from "react-redux";
import { useUpvotes } from "../../../reactQuery/upvotes/useUpvotes";
import { faCircleUp as fullCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useCreateUpvote } from "../../../reactQuery/upvotes/useCreateUpvote";
import { useDeleteQuestionUpvote } from "../../../reactQuery/upvotes/useDeleteQuestionUpvote";
import { useState } from "react";

const findContentIndex = (contents, contentId) => {
  const content = contents?.find((content) => content?.id === contentId);
  return `Lecture ${content?.index}`;
};

function Question({ question, setShowQuestionReplies, showReplies = true }) {
  const { contents, filterType, sortFilter, filterQuestions } = useSelector(
    (store) => store.questions,
  );

  const { upvotes } = useUpvotes(question?.course_id);
  const { upvoteQuestion } = useCreateUpvote(
    question?.course_id,
    buildQuestionsQueryObj(
      filterType,
      sortFilter,
      filterQuestions,
      question?.course_id,
    ),
  );
  const { deleteUpvoteQuestion } = useDeleteQuestionUpvote(
    question?.course_id,
    buildQuestionsQueryObj(
      filterType,
      sortFilter,
      filterQuestions,
      question?.course_id,
    ),
  );
  const userUpvotes = upvotes?.data?.map((upvote) => upvote.question_id);

  const [upvoteCount, setUpvoteCount] = useState(question?.upvote_count);

  const questionDetails =
    question?.details?.length > 100
      ? `${question?.details?.slice(0, 100)}...`
      : question?.details;

  return (
    <>
      <div
        className={`flex items-start p-5 ${showReplies && "hover:bg-gray-100"}`}
      >
        <div className="w-[8%]">
          <DefaultUserProfile
            firstName={question?.user?.first_name}
            lastName={question?.user?.last_name}
          />
        </div>
        <div className="flex-1 flex-col">
          <h3 className="text-lg font-semibold">{question?.title}</h3>
          {showReplies ? (
            <div dangerouslySetInnerHTML={{ __html: questionDetails }}></div>
          ) : (
            <p className="mb-5 text-sm">
              <span className="text-purple-600 underline underline-offset-2 hover:cursor-pointer">
                {question?.user?.first_name} {question?.user?.last_name}
              </span>{" "}
              ·{" "}
              <span className="text-purple-600 hover:cursor-pointer">
                {findContentIndex(contents, question?.content_id)}
              </span>
              · {timeAgo(question?.created_at)}
            </p>
          )}
          {showReplies ? (
            <p className="mt-5 text-sm">
              <span className="text-purple-600 underline underline-offset-2 hover:cursor-pointer">
                {question?.user?.first_name} {question?.user?.last_name}
              </span>{" "}
              ·{" "}
              <span className="text-purple-600 hover:cursor-pointer">
                {findContentIndex(contents, question?.content_id)}
              </span>
              · {timeAgo(question?.created_at)}
            </p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: questionDetails }}></div>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-1">
            <span className="font-semibold">{upvoteCount}</span>
            {!userUpvotes?.includes(question.id) ? (
              <FontAwesomeIcon
                onClick={() =>
                  upvoteQuestion(
                    { question_id: question.id },
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
                  deleteUpvoteQuestion(question?.id, {
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
          {showReplies && (
            <div className="flex items-center gap-x-1">
              <span className="font-semibold">{question?.replies_count}</span>

              <FontAwesomeIcon
                onClick={() =>
                  setShowQuestionReplies({
                    show: true,
                    questionId: question.id,
                  })
                }
                role="button"
                icon={faComment}
                size="lg"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Question;
