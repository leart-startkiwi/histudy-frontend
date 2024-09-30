import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview as updateReviewApi } from "../../services/apiReviews";

export function useUpdateReview() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateReview } = useMutation({
    mutationFn: (updateReviewObj) =>
      updateReviewApi(updateReviewObj.id, updateReviewObj.updateReviewObj),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownReview"],
      });
    },
  });

  return { isLoading, updateReview };
}
