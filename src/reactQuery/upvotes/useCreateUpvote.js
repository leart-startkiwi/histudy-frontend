import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upvoteQuestion as upvoteQuestionApi } from "../../services/apiUpvotes";

export function useCreateUpvote(courseId, queryObj) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: upvoteQuestion } = useMutation({
    mutationFn: upvoteQuestionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["upvotes", courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["questions", courseId.toString(), queryObj],
      });
    },
  });

  return { isLoading, upvoteQuestion };
}
