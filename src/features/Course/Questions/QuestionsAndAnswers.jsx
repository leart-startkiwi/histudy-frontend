import { useState } from "react";
import NewQuestionForm from "./NewQuestionForm";
import QuestionFilters from "./QuestionFilters";
import { useSelector } from "react-redux";
import { useQuestions } from "../../../reactQuery/questions/useQuestions";
import { useParams } from "react-router";
import Question from "./Question";
import QuestionReplies from "./QuestionReplies";
import { buildQuestionsQueryObj } from "../../../utils/helpers";

function QuestionsAndAnswers() {
  const params = useParams();
  const { filterType, sortFilter, filterQuestions } = useSelector(
    (store) => store.questions,
  );

  const [showNewQuestionForm, setNewQuestionForm] = useState(false);
  const [showQuestionReplies, setShowQuestionReplies] = useState({
    show: false,
    questionId: null,
  });

  const { questions } = useQuestions(
    params.id,
    buildQuestionsQueryObj(
      filterType,
      sortFilter,
      filterQuestions,
      params.lectureId,
    ),
  );

  return (
    <>
      {!showNewQuestionForm && !showQuestionReplies.show ? (
        <>
          <QuestionFilters />
          <p className="mb-5 mt-10 text-xl font-bold">
            All questions in this course
            <span className="text-base text-gray-600">
              {" "}
              ({questions?.results})
            </span>
          </p>
          {questions?.data?.map((question) => (
            <Question
              key={question.id}
              question={question}
              setShowQuestionReplies={setShowQuestionReplies}
            />
          ))}
          <p
            role="button"
            onClick={() => setNewQuestionForm(true)}
            className="mt-10 font-bold hover:text-gray-700"
          >
            Ask a new question
          </p>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setNewQuestionForm(false);
              setShowQuestionReplies({ show: false, questionId: null });
            }}
            className="border border-black px-5 py-3 text-base font-semibold hover:bg-gray-200"
          >
            Back to all questions
          </button>
          {showNewQuestionForm ? (
            <NewQuestionForm setNewQuestionForm={setNewQuestionForm} />
          ) : (
            <QuestionReplies
              question={questions?.data?.find(
                (question) => question?.id === showQuestionReplies?.questionId,
              )}
              questionId={showQuestionReplies.questionId}
            />
          )}
        </>
      )}
    </>
  );
}

export default QuestionsAndAnswers;
