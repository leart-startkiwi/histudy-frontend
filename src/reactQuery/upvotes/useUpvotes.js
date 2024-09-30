import { useQuery } from "@tanstack/react-query";
import { getUpvotes } from "../../services/apiUpvotes";

export function useUpvotes(courseId) {
  const { isLoading, data: upvotes } = useQuery({
    queryKey: ["upvotes", courseId],
    queryFn: getUpvotes,
  });

  return { isLoading, upvotes };
}
