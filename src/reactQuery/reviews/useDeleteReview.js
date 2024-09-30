import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview as deleteReviewApi } from "../../services/apiReviews";

export function useDeleteReview() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteReview } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownReview"],
      });
      queryClient.setQueryData(["ownReview"], null);
    },
  });

  return { isLoading, deleteReview };
}
