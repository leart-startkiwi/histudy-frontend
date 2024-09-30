import { useQuestionReplies } from "../../../reactQuery/question-replies/useQuestionReplies";
import Question from "./Question";
import QuestionReply from "./QuestionReply";
import { useUser } from "../../../reactQuery/useUser";
import DefaultUserProfile from "../../../ui/DefaultUserProfile";
import { useRef, useState } from "react";
import { useCreateQuestionReply } from "../../../reactQuery/question-replies/useCreateQuestionReply";

function QuestionReplies({ question, questionId }) {
  const { questionReplies } = useQuestionReplies(questionId);
  const { createQuestionReply } = useCreateQuestionReply(
    questionId,
    question?.course_id,
  );
  const { user } = useUser();

  const [inputFocused, setInputFocused] = useState(false);
  const [reply, setReply] = useState("");
  const inputRef = useRef(null);

  return (
    <>
      <Question question={question} showReplies={false} />
      <p className="mt-10 font-bold">{questionReplies?.results} replies</p>
      {questionReplies?.data?.map((reply) => (
        <QuestionReply key={reply.id} reply={reply} />
      ))}
      <div className="mt-10 flex items-start gap-x-4">
        <DefaultUserProfile
          firstName={user?.first_name}
          lastName={user?.last_name}
        />
        <div className="flex w-full flex-col gap-y-2">
          <input
            ref={inputRef}
            onFocus={() => setInputFocused(true)}
            onBlur={() => {
              setInputFocused(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setInputFocused(false);
                e.target.blur();
              }
              if (e.key === "Enter") {
                createQuestionReply(
                  { reply, question_id: questionId },
                  {
                    onSuccess: () => {
                      setReply("");
                      e.target.blur();
                    },
                  },
                );
              }
            }}
            type="text"
            placeholder="Add reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          {inputFocused && (
            <p className="text-xs">
              Press <strong>Enter</strong> to post, <strong>Esc</strong> to
              cancel
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default QuestionReplies;
