import { useQuery } from "@tanstack/react-query";
import { getQuestionReplies } from "../../services/apiQuestionReplies";

export function useQuestionReplies(questionId) {
  const { isLoading, data: questionReplies } = useQuery({
    queryKey: ["questionReplies", questionId],
    queryFn: () => getQuestionReplies(questionId),
  });

  return { isLoading, questionReplies };
}
