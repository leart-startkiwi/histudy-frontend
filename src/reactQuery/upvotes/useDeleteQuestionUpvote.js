import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUpvoteQuestion as deleteUpvoteQuestionApi } from "../../services/apiUpvotes";

export function useDeleteQuestionUpvote(courseId, queryObj) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteUpvoteQuestion } = useMutation({
    mutationFn: deleteUpvoteQuestionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["upvotes", courseId],
      });
      queryClient.invalidateQueries({
        queryKey: ["questions", courseId.toString(), queryObj],
      });
    },
  });

  return { isLoading, deleteUpvoteQuestion };
}
