import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReplyUpvote as deleteReplyUpvoteApi } from "../../services/apiReplyUpvotes";

export function useDeleteReplyUpvote(questionId) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteReplyUpvote } = useMutation({
    mutationFn: deleteReplyUpvoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replyUpvotes", questionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["questionReplies", questionId],
      });
    },
  });

  return { isLoading, deleteReplyUpvote };
}
