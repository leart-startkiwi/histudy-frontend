import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestionReply as createQuestionReplyApi } from "../../services/apiQuestionReplies";

export function useCreateQuestionReply(questionId, courseId) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createQuestionReply } = useMutation({
    mutationFn: createQuestionReplyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questionReplies", questionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["questions", courseId.toString()],
      });
    },
  });

  return { isLoading, createQuestionReply };
}
