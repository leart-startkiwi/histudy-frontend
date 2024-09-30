import { useQuery } from "@tanstack/react-query";
import { getReplyUpvotes } from "../../services/apiReplyUpvotes";

export function useReplyUpvotes(questionId) {
  const { isLoading, data: replyUpvotes } = useQuery({
    queryKey: ["replyUpvotes", questionId],
    queryFn: getReplyUpvotes,
  });

  return { isLoading, replyUpvotes };
}
