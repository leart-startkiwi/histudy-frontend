import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion as createQuestionApi } from "../../services/apiQuestions";

export function useCreateQuestion(courseId) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: createQuestion } = useMutation({
    mutationFn: createQuestionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", courseId],
      });
    },
  });

  return { isLoading, createQuestion };
}
