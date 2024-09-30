import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upvoteReply as upvoteReplyApi } from "../../services/apiReplyUpvotes";

export function useCreateReplyUpvote(questionId) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: upvoteReply } = useMutation({
    mutationFn: upvoteReplyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replyUpvotes", questionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["questionReplies", questionId],
      });
    },
  });

  return { isLoading, upvoteReply };
}
